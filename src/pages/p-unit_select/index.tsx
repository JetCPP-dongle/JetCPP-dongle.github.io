

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface UnitData {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  progress: number;
}

const UnitSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedUnitName, setSelectedUnitName] = useState<string | null>(null);

  const unitsData: UnitData[] = [
    {
      id: 'unit1',
      name: '第一单元：走进大自然',
      title: '第一单元',
      description: '走进大自然',
      icon: 'fas fa-leaf',
      gradientFrom: 'from-primary',
      gradientTo: 'to-secondary',
      progress: 0
    },
    {
      id: 'unit2',
      name: '第二单元：爱国情怀',
      title: '第二单元',
      description: '爱国情怀',
      icon: 'fas fa-flag',
      gradientFrom: 'from-tertiary',
      gradientTo: 'to-accent',
      progress: 0
    },
    {
      id: 'unit3',
      name: '第三单元：科学探索',
      title: '第三单元',
      description: '科学探索',
      icon: 'fas fa-microscope',
      gradientFrom: 'from-secondary',
      gradientTo: 'to-primary',
      progress: 0
    },
    {
      id: 'unit4',
      name: '第四单元：传统文化',
      title: '第四单元',
      description: '传统文化',
      icon: 'fas fa-yin-yang',
      gradientFrom: 'from-accent',
      gradientTo: 'to-danger',
      progress: 0
    },
    {
      id: 'unit5',
      name: '第五单元：人物故事',
      title: '第五单元',
      description: '人物故事',
      icon: 'fas fa-user-friends',
      gradientFrom: 'from-danger',
      gradientTo: 'to-primary',
      progress: 0
    },
    {
      id: 'midterm',
      name: '期中模拟卷',
      title: '期中模拟卷',
      description: '综合测试',
      icon: 'fas fa-file-alt',
      gradientFrom: 'from-primary',
      gradientTo: 'to-tertiary',
      progress: 0
    },
    {
      id: 'unit6',
      name: '第六单元：生活哲理',
      title: '第六单元',
      description: '生活哲理',
      icon: 'fas fa-lightbulb',
      gradientFrom: 'from-secondary',
      gradientTo: 'to-accent',
      progress: 0
    },
    {
      id: 'unit7',
      name: '第七单元：艺术之美',
      title: '第七单元',
      description: '艺术之美',
      icon: 'fas fa-palette',
      gradientFrom: 'from-accent',
      gradientTo: 'to-secondary',
      progress: 0
    },
    {
      id: 'final',
      name: '期末模拟卷',
      title: '期末模拟卷',
      description: '综合评估',
      icon: 'fas fa-graduation-cap',
      gradientFrom: 'from-tertiary',
      gradientTo: 'to-danger',
      progress: 0
    }
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '选择单元 - 文海拾贝';
    return () => { document.title = originalTitle; };
  }, []);

  const handleUnitCardClick = (unit: UnitData) => {
    setSelectedUnitId(unit.id);
    setSelectedUnitName(unit.name);
  };

  const handleConfirmButtonClick = () => {
    if (selectedUnitId && selectedUnitName) {
      navigate(`/content-select?unitId=${selectedUnitId}&unitName=${encodeURIComponent(selectedUnitName)}`);
    }
  };

  const handleUnitCardKeyDown = (e: React.KeyboardEvent, unit: UnitData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUnitCardClick(unit);
    }
  };

  const handleConfirmButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedUnitId) {
      handleConfirmButtonClick();
    }
  };

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
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/home" className={styles.breadcrumbItem}>
                <i className="fas fa-home mr-1"></i>主页
              </Link>
              <i className="fas fa-chevron-right text-textSecondary text-xs"></i>
              <span className={`${styles.breadcrumbItem} ${styles.active}`}>单元选择</span>
            </div>
            
            {/* 右侧占位 */}
            <div className="w-16"></div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <section className={`${styles.glassCard} rounded-3xl p-8 mb-8 text-center`}>
            <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-4">
              选择单元 📖
            </h1>
            <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
              选择你想要练习的单元，开始你的语文学习之旅！
            </p>
          </section>
          
          {/* 单元列表 */}
          <section className={`${styles.glassCard} rounded-3xl p-8 mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unitsData.map((unit) => (
                <div
                  key={unit.id}
                  className={`${styles.unitCard} ${selectedUnitId === unit.id ? styles.selected : ''} rounded-2xl p-6 text-center`}
                  onClick={() => handleUnitCardClick(unit)}
                  onKeyDown={(e) => handleUnitCardKeyDown(e, unit)}
                  tabIndex={0}
                  role="button"
                  aria-label={`选择${unit.name}`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${unit.gradientFrom} ${unit.gradientTo} mx-auto mb-4 flex items-center justify-center`}>
                    <i className={`${unit.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">{unit.title}</h3>
                  <p className="text-textSecondary text-sm mb-4">{unit.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-textSecondary">进度: {unit.progress}%</span>
                    <div className="w-16 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${unit.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* 底部操作区 */}
          <section className="text-center">
            <button
              className={`${styles.glassButton} ${styles.pulseGlow} rounded-2xl px-16 py-4 text-xl font-bold text-textPrimary hover:text-primary transition-all duration-300 ${!selectedUnitId ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedUnitId}
              onClick={handleConfirmButtonClick}
              onKeyDown={handleConfirmButtonKeyDown}
              tabIndex={!selectedUnitId ? -1 : 0}
            >
              <i className="fas fa-check mr-3"></i>
              确定选择
            </button>
            <p className={`text-sm mt-4 ${!selectedUnitId ? 'text-textSecondary' : 'text-primary'}`}>
              {!selectedUnitId ? '请先选择一个单元' : `已选择：${selectedUnitName}`}
            </p>
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

export default UnitSelectPage;

