

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface UserAnswers {
  [key: number]: string | null;
}

interface CorrectAnswers {
  [key: number]: string;
}

const OnlineAnswerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 初始化40道题的答案状态
  const initializeUserAnswers = (): UserAnswers => {
    const answers: UserAnswers = {};
    for (let i = 1; i <= 40; i++) {
      // 偶数题是主观题，初始化为空字符串
      answers[i] = i % 2 === 0 ? '' : null;
    }
    return answers;
  };
  
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(initializeUserAnswers);

  const [showResults, setShowResults] = useState(false);
  const [pageTitle, setPageTitle] = useState('第一单元练习');
  const [unitDescription, setUnitDescription] = useState('走进大自然 - 阅读理解与基础知识练习');

  // 40道题的正确答案
  const correctAnswers: CorrectAnswers = {
    1: 'D', 3: 'C', 5: 'B', 7: 'A', 9: 'C',
    11: 'D', 13: 'B', 15: 'A', 17: 'C', 19: 'D',
    21: 'B', 23: 'A', 25: 'C', 27: 'D', 29: 'B',
    31: 'A', 33: 'C', 35: 'D', 37: 'B', 39: 'A'
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '在线作答 - 文海拾贝';
    return () => { document.title = originalTitle; };
  }, []);

  // 根据URL参数更新页面内容
  useEffect(() => {
    const unitId = searchParams.get('unit_id');
    const contentType = searchParams.get('content_type');
    
    if (unitId) {
      updatePageContent(unitId, contentType);
    }
  }, [searchParams]);

  // 从本地存储加载答案
  useEffect(() => {
    const savedAnswers = localStorage.getItem('userAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setUserAnswers(parsedAnswers);
      } catch (error) {
        console.error('Failed to parse saved answers:', error);
      }
    }
  }, []);

  const updatePageContent = (unitId: string, contentType: string | null) => {
    const unitNames: Record<string, string> = {
      'unit1': '第一单元练习',
      'unit2': '第二单元练习',
      'midterm': '期中模拟卷',
      'final': '期末模拟卷'
    };

    const unitDescriptions: Record<string, string> = {
      'unit1': '走进大自然 - 阅读理解与基础知识练习',
      'unit2': '传统文化 - 古文阅读与文学常识',
      'midterm': '期中综合测试 - 全面考察学习成果',
      'final': '期末综合测试 - 系统复习与巩固'
    };

    if (unitNames[unitId]) {
      setPageTitle(unitNames[unitId]);
      setUnitDescription(unitDescriptions[unitId]);
    }
  };

  const handleOptionClick = (questionId: number, optionValue: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionValue
    }));
    saveAnswersToStorage({
      ...userAnswers,
      [questionId]: optionValue
    });
  };

  const handleTextareaChange = (questionId: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    saveAnswersToStorage({
      ...userAnswers,
      [questionId]: value
    });
  };

  const saveAnswersToStorage = (answers: UserAnswers) => {
    localStorage.setItem('userAnswers', JSON.stringify(answers));
  };

  const getAnsweredCount = () => {
    return Object.values(userAnswers).filter(answer => answer !== null && answer !== '').length;
  };

  const getProgressPercent = () => {
    const answeredCount = getAnsweredCount();
    const totalQuestions = Object.keys(userAnswers).length;
    return (answeredCount / totalQuestions) * 100;
  };

  const handleSubmit = () => {
    const unansweredCount = Object.values(userAnswers).filter(answer => answer === null || answer === '').length;
    
    if (unansweredCount > 0) {
      if (window.confirm(`还有 ${unansweredCount} 道题目未完成，确定要提交吗？`)) {
        setShowResults(true);
        localStorage.removeItem('userAnswers');
      }
    } else {
      setShowResults(true);
      localStorage.removeItem('userAnswers');
    }
  };

  const handleBackHome = () => {
    navigate('/home');
  };

  const handleContinuePractice = () => {
    navigate('/unit-select');
  };

  const isAnswerCorrect = (questionId: number) => {
    return userAnswers[questionId] === correctAnswers[questionId as keyof CorrectAnswers];
  };

  const getStatusClass = (questionId: number) => {
    const isCorrect = isAnswerCorrect(questionId);
    return isCorrect 
      ? 'px-3 py-1 rounded-full text-sm font-medium bg-tertiary bg-opacity-20 text-tertiary'
      : 'px-3 py-1 rounded-full text-sm font-medium bg-danger bg-opacity-20 text-danger';
  };

  const getStatusText = (questionId: number) => {
    return isAnswerCorrect(questionId) ? '正确' : '错误';
  };

  const calculateMultipleChoiceScore = () => {
    let score = 0;
    // 计算所有奇数题（选择题）的得分
    for (let i = 1; i <= 40; i += 2) {
      if (isAnswerCorrect(i)) score++;
    }
    return score;
  };

  if (showResults) {
    return (
      <div className={styles.pageWrapper}>
        {/* 顶部导航栏 */}
        <nav className={`fixed top-0 left-0 right-0 z-50 ${styles.glassCard}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo和产品名称 */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <i className="fas fa-book-open text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-textPrimary">文海拾贝</span>
              </div>
              
              {/* 面包屑导航 */}
              <div className="hidden md:flex items-center space-x-2 text-textSecondary">
                <Link to="/home" className="hover:text-primary transition-colors">主页</Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <Link to="/unit-select" className="hover:text-primary transition-colors">单元选择</Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <Link to={`/content-select?unit_id=${searchParams.get('unit_id') || ''}`} className="hover:text-primary transition-colors">内容选择</Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <span className="text-textPrimary">在线作答</span>
              </div>
              
              {/* 右侧占位 */}
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center ${styles.floatingAnimation}`}>
                  <i className="fas fa-clock text-white text-sm"></i>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* 主内容区 */}
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 页面头部 */}
            <section className={`${styles.glassCard} rounded-3xl p-6 mb-6`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-textPrimary mb-2">{pageTitle}</h1>
                  <p className="text-textSecondary">{unitDescription}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-textSecondary mb-2">已完成 40/40 题</div>
                  <div className={styles.progressBar + ' w-48 h-2'}>
                    <div className={styles.progressFill + ' w-full'}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* 结果展示区 */}
            <section className="space-y-6">
              {/* 总体得分 */}
              <div className={`${styles.glassCard} rounded-3xl p-6 text-center`}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-trophy text-white text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-textPrimary mb-2">作答完成！</h2>
                <p className="text-lg text-textSecondary mb-4">
                  选择题得分：<span className="text-primary font-bold">{calculateMultipleChoiceScore()}</span>/<span>20</span>
                </p>
                <div className={`${styles.resultCard} rounded-2xl p-4`}>
                  <p className="text-textSecondary">
                    <i className="fas fa-info-circle text-accent mr-2"></i>
                    阅读题需要您对照答案自行批改，请认真检查自己的答案。
                  </p>
                </div>
              </div>

              {/* 详细结果 */}
              {/* 只显示选择题结果，主观题需要人工批改 */}
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => i * 2 + 1).map((questionId) => (
                  <div key={questionId} className={`${styles.glassCard} rounded-2xl p-6`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{questionId}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-textPrimary">选择题</h3>
                      <div className={getStatusClass(questionId)}>
                        {getStatusText(questionId)}
                      </div>
                    </div>
                    <div className={`${styles.resultCard} rounded-xl p-4`}>
                      <p className="text-textSecondary mb-2">
                        <i className="fas fa-check-circle text-tertiary mr-2"></i>
                        正确答案：<span className="text-tertiary font-bold">{correctAnswers[questionId]}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={handleBackHome}
                  className={`${styles.glassButton} rounded-xl px-8 py-3 text-lg font-semibold text-textPrimary hover:text-primary transition-all duration-300`}
                >
                  <i className="fas fa-home mr-2"></i>
                  返回主页
                </button>
                <button 
                  onClick={handleContinuePractice}
                  className={`${styles.glassButton} rounded-xl px-8 py-3 text-lg font-semibold text-textPrimary hover:text-primary transition-all duration-300`}
                >
                  <i className="fas fa-redo mr-2"></i>
                  继续练习
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${styles.glassCard}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和产品名称 */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <i className="fas fa-book-open text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-textPrimary">文海拾贝</span>
            </div>
            
            {/* 面包屑导航 */}
            <div className="hidden md:flex items-center space-x-2 text-textSecondary">
              <Link to="/home" className="hover:text-primary transition-colors">主页</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <Link to="/unit-select" className="hover:text-primary transition-colors">单元选择</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <Link to={`/content-select?unit_id=${searchParams.get('unit_id') || ''}`} className="hover:text-primary transition-colors">内容选择</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="text-textPrimary">在线作答</span>
            </div>
            
            {/* 右侧占位 */}
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center ${styles.floatingAnimation}`}>
                <i className="fas fa-clock text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <section className={`${styles.glassCard} rounded-3xl p-6 mb-6`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary mb-2">{pageTitle}</h1>
                <p className="text-textSecondary">{unitDescription}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-textSecondary mb-2">
                  已完成 {getAnsweredCount()}/40 题
                </div>
                <div className={styles.progressBar + ' w-48 h-2'}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${getProgressPercent()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          {/* 题目展示区 - 40道题 */}
          <section className="space-y-6 mb-8">
            {/* 生成40道题，奇数题是选择题，偶数题是主观题 */}
            {Array.from({ length: 40 }, (_, i) => i + 1).map((questionId) => {
              // 奇数题是选择题
              if (questionId % 2 === 1) {
                // 不同难度的选择题题目
                const questionTypes = [
                  {
                    title: "下列加点字的注音完全正确的一项是？",
                    options: [
                      { option: 'A', text: "粗犷(kuàng) 静谧(mì) 咄咄逼人(duō)" },
                      { option: 'B', text: "莅临(lì) 棱镜(líng) 参差不齐(cēn)" },
                      { option: 'C', text: "确凿(záo) 倜傥(tǎng) 混为一谈(hùn)" },
                      { option: 'D', text: "狭隘(ài) 热忱(chéng) 拈轻怕重(niān)" }
                    ]
                  },
                  {
                    title: "下列句子中，加点成语使用不恰当的一项是？",
                    options: [
                      { option: 'A', text: "他的演讲深入浅出，生动有趣，让听众如痴如醉。" },
                      { option: 'B', text: "这部小说情节跌宕起伏，抑扬顿挫，非常吸引人。" },
                      { option: 'C', text: "面对困难，我们要勇敢面对，不能拈轻怕重。" },
                      { option: 'D', text: "他总是殚精竭虑地为公司着想，是大家学习的榜样。" }
                    ]
                  },
                  {
                    title: "下列句子中没有语病的一项是？",
                    options: [
                      { option: 'A', text: "通过这次活动，使我明白了许多道理。" },
                      { option: 'B', text: "我们要认真克服并随时发现自己的缺点。" },
                      { option: 'C', text: "是否具有良好的心理素质，是考试取得好成绩的条件之一。" },
                      { option: 'D', text: "在学习中，我们要及时发现并解决存在的问题。" }
                    ]
                  },
                  {
                    title: "下列文学常识表述有误的一项是？",
                    options: [
                      { option: 'A', text: "《论语》是儒家经典著作，记录了孔子及其弟子的言行。" },
                      { option: 'B', text: "《朝花夕拾》是鲁迅的一部回忆性散文集。" },
                      { option: 'C', text: "《西游记》是我国古代第一部浪漫主义章回体长篇神魔小说。" },
                      { option: 'D', text: "《资治通鉴》是北宋司马光主持编纂的一部纪传体通史。" }
                    ]
                  },
                  {
                    title: "下列句子中，标点符号使用正确的一项是？",
                    options: [
                      { option: 'A', text: "我不知道他为什么迟到？" },
                      { option: 'B', text: "他看上去十七、八岁，一副瘦骨伶仃的样子。" },
                      { option: 'C', text: "“这究竟是怎么回事呢？同志们。”厂长严肃地说。" },
                      { option: 'D', text: "基础知识究竟扎实不扎实，对今后的继续深造有重要影响。" }
                    ]
                  }
                ];
                
                const questionType = questionTypes[(questionId - 1) % questionTypes.length];
                
                return (
                  <div key={questionId} className={`${styles.glassCard} rounded-2xl p-6`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{questionId}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-textPrimary mb-3">{questionType.title}</h3>
                        <div className="space-y-3">
                          {questionType.options.map((item) => (
                            <div
                              key={item.option}
                              className={`${styles.optionCard} rounded-xl p-4 ${
                                userAnswers[questionId] === item.option ? styles.selected : ''
                              }`}
                              onClick={() => handleOptionClick(questionId, item.option)}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="w-6 h-6 rounded-full bg-white bg-opacity-50 flex items-center justify-center text-textPrimary font-bold">
                                  {item.option}
                                </span>
                                <span className="text-textPrimary">{item.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } 
              // 偶数题是主观题（阅读理解或作文）
              else {
                // 不同类型的主观题
                const subjectiveQuestions = [
                  {
                    title: "阅读理解",
                    passage: "苏轼《题西林壁》：横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。",
                    question: "这首诗揭示了怎样的哲理？请结合诗句简要分析。"
                  },
                  {
                    title: "文言文阅读",
                    passage: "《论语·为政》：子曰：“学而不思则罔，思而不学则殆。”",
                    question: "请解释这句话的意思，并谈谈你对这句话的理解。"
                  },
                  {
                    title: "现代文阅读",
                    passage: "余秋雨《文化苦旅》片段：“水，看似柔顺无骨，却能变得气势滚滚，波涌浪叠，无比强大；看似无色无味，却能挥洒出茫茫绿野，累累硕果，万紫千红；看似自处低下，却能蒸腾九霄，为云为雨，为虹为霞……”",
                    question: "这段文字运用了什么修辞手法？有什么表达效果？"
                  },
                  {
                    title: "语言表达",
                    passage: "",
                    question: "请以“科技与生活”为话题，写一段不少于200字的短文，谈谈你的看法。"
                  },
                  {
                    title: "作文片段",
                    passage: "",
                    question: "请以“那一刻，我明白了”为题，写一个作文片段，要求有细节描写，不少于300字。"
                  }
                ];
                
                const subjectiveQuestion = subjectiveQuestions[(questionId / 2 - 1) % subjectiveQuestions.length];
                
                return (
                  <div key={questionId} className={`${styles.glassCard} rounded-2xl p-6`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{questionId}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-textPrimary mb-3">{subjectiveQuestion.title}</h3>
                        {subjectiveQuestion.passage && (
                          <div className={`${styles.glassCard} rounded-xl p-4 mb-4`}>
                            <p className="text-textPrimary leading-relaxed">
                              {subjectiveQuestion.passage}
                            </p>
                          </div>
                        )}
                        <h4 className="text-md font-semibold text-textPrimary mb-3">
                          {subjectiveQuestion.question}
                        </h4>
                        <textarea
                          className={`${styles.textareaCustom} w-full h-48 p-4 rounded-xl text-textPrimary placeholder-textSecondary`}
                          placeholder="请在这里输入你的答案..."
                          value={userAnswers[questionId] || ''}
                          onChange={(e) => handleTextareaChange(questionId, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </section>

          {/* 提交按钮区域 */}
          <section className="text-center mb-8">
            <button
              onClick={handleSubmit}
              className={`${styles.glassButton} ${styles.pulseGlow} rounded-2xl px-16 py-4 text-xl font-bold text-textPrimary hover:text-primary transition-all duration-300`}
            >
              <i className="fas fa-paper-plane mr-3"></i>
              提交答案
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OnlineAnswerPage;

