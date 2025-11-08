

import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface UnitData {
  name: string;
}

const ContentSelectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentUnitName, setCurrentUnitName] = useState<string>('第一单元：走进大自然');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '选择练习内容 - 文海拾贝';
    return () => { document.title = originalTitle; };
  }, []);

  // 处理URL参数和单元数据
  useEffect(() => {
    const unitId = searchParams.get('unitId') || 'unit1';
    
    // 模拟单元数据
    const unitDataMap: Record<string, UnitData> = {
      'unit1': { name: '第一单元：走进大自然' },
      'unit2': { name: '第二单元：人间真情' },
      'unit3': { name: '第三单元：科技之光' },
      'midterm': { name: '期中模拟卷' },
      'final': { name: '期末模拟卷' }
    };
    
    if (unitDataMap[unitId]) {
      setCurrentUnitName(unitDataMap[unitId].name);
    }
  }, [searchParams]);

  // 处理内容选择点击
  const handleContentSelection = (contentType: 'exam' | 'exercise') => {
    const unitId = searchParams.get('unitId') || 'unit1';
    navigate(`/online-answer?unitId=${unitId}&contentType=${contentType}`);
  };

  // 处理导出按钮点击
  const handleExportExam = () => {
    console.log('需要调用第三方接口实现Markdown文件导出功能');
    alert('试卷导出功能正在开发中，敬请期待！');
  };

  const handleExportExercise = () => {
    console.log('需要调用第三方接口实现Markdown文件导出功能');
    alert('练习题导出功能正在开发中，敬请期待！');
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement?.id === 'option-exam') {
          handleContentSelection('exam');
        } else if (activeElement?.id === 'option-exercise') {
          handleContentSelection('exercise');
        } else if (activeElement?.id === 'export-exam-btn') {
          handleExportExam();
        } else if (activeElement?.id === 'export-exercise-btn') {
          handleExportExercise();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
              <Link to="/home" className="hover:text-primary transition-colors">
                <i className="fas fa-home mr-1"></i>主页
              </Link>
              <i className="fas fa-chevron-right text-sm"></i>
              <Link to="/unit-select" className="hover:text-primary transition-colors">
                单元选择
              </Link>
              <i className="fas fa-chevron-right text-sm"></i>
              <span className="text-textPrimary">内容选择</span>
            </div>
            
            {/* 右侧占位 */}
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center ${styles.floatingAnimation}`}>
              <i className="fas fa-star text-white text-sm"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <section className={`${styles.glassCard} rounded-3xl p-8 mb-8 text-center`}>
            <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-4">
              选择练习内容 📝
            </h1>
            <div className={`${styles.glassCard} rounded-2xl p-4 inline-block`}>
              <i className="fas fa-layer-group mr-2 text-primary"></i>
              <span className="text-lg text-textPrimary font-semibold">{currentUnitName}</span>
            </div>
          </section>

          {/* 功能选择区 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">
              选择练习类型
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 做卷选项 */}
              <div 
                id="option-exam"
                className={`${styles.contentCard} ${styles.glassCard} rounded-3xl p-8 text-center ${styles.floatingAnimation}`}
                style={{ animationDelay: '0s' }}
                onClick={() => handleContentSelection('exam')}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleContentSelection('exam');
                  }
                }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-6 flex items-center justify-center">
                  <i className="fas fa-file-alt text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-textPrimary mb-4">做卷</h3>
                <p className="text-textSecondary mb-6 leading-relaxed">
                  完成一套完整的单元测试卷，包含选择题、阅读题等多种题型，系统自动计时并批改选择题。
                </p>
                <div className="space-y-2 text-sm text-textSecondary">
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-clock"></i>
                    <span>建议用时：45分钟</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-question-circle"></i>
                    <span>题目数量：20-30题</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-calculator"></i>
                    <span>总分：100分</span>
                  </div>
                </div>
              </div>
              
              {/* 练习选项 */}
              <div 
                id="option-exercise"
                className={`${styles.contentCard} ${styles.glassCard} rounded-3xl p-8 text-center ${styles.floatingAnimation}`}
                style={{ animationDelay: '1s' }}
                onClick={() => handleContentSelection('exercise')}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleContentSelection('exercise');
                  }
                }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-tertiary to-accent mx-auto mb-6 flex items-center justify-center">
                  <i className="fas fa-pen-fancy text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-textPrimary mb-4">练习</h3>
                <p className="text-textSecondary mb-6 leading-relaxed">
                  针对性的单元练习题，专注于重点知识点的巩固和强化，帮助你查漏补缺。
                </p>
                <div className="space-y-2 text-sm text-textSecondary">
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-clock"></i>
                    <span>建议用时：20分钟</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-question-circle"></i>
                    <span>题目数量：10-15题</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-bullseye"></i>
                    <span>重点强化</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 导出操作区 */}
          <section className={`${styles.glassCard} rounded-3xl p-8 text-center`}>
            <h2 className="text-2xl font-bold text-textPrimary mb-6">
              离线练习选项 📄
            </h2>
            
            <div className="mb-8">
              <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">
                可以将试卷或练习题导出为Markdown格式文件，下载后可在本地编辑或打印，随时随地进行练习。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 导出试卷 */}
              <button 
                id="export-exam-btn"
                className={`${styles.glassButton} rounded-2xl p-6 text-left hover:scale-105 transition-transform`}
                onClick={handleExportExam}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <i className="fas fa-download text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-textPrimary mb-1">导出试卷</h4>
                    <p className="text-sm text-textSecondary">下载完整的单元测试卷</p>
                  </div>
                  <i className="fas fa-arrow-right text-textSecondary"></i>
                </div>
              </button>
              
              {/* 导出练习 */}
              <button 
                id="export-exercise-btn"
                className={`${styles.glassButton} rounded-2xl p-6 text-left hover:scale-105 transition-transform`}
                onClick={handleExportExercise}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center">
                    <i className="fas fa-download text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-textPrimary mb-1">导出练习</h4>
                    <p className="text-sm text-textSecondary">下载单元练习题</p>
                  </div>
                  <i className="fas fa-arrow-right text-textSecondary"></i>
                </div>
              </button>
            </div>
            
            {/* 提示信息 */}
            <div className={`${styles.glassCard} rounded-xl p-4`}>
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-secondary mt-1"></i>
                <div className="text-left">
                  <h5 className="font-semibold text-textPrimary mb-1">使用提示</h5>
                  <p className="text-sm text-textSecondary">
                    导出的Markdown文件可使用Typora、VS Code等编辑器打开，也可直接转换为PDF格式进行打印。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 底部版权信息 */}
      <footer className={`${styles.glassCard} rounded-t-3xl p-6 text-center`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <i className="fas fa-heart text-danger"></i>
              <span className="text-textSecondary">用心做教育</span>
            </div>
            <div className="text-textSecondary">
              © 2024 文海拾贝. 保留所有权利.
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <i className="fas fa-question-circle"></i>
                <span className="ml-1">帮助</span>
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors">
                <i className="fas fa-envelope"></i>
                <span className="ml-1">联系我们</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContentSelectPage;

