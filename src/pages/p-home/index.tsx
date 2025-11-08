

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface User {
  username: string;
}

const HomePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '文海拾贝 - 六年级语文练习平台';
    return () => { document.title = originalTitle; };
  }, []);

  useEffect(() => {
    checkUserLogin();
  }, []);

  useEffect(() => {
    // 页面加载动画
    const elements = document.querySelectorAll(`.${styles.floatingAnimation}`);
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);

  const checkUserLogin = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      }
    }
  };

  const handleStartPractice = () => {
    navigate('/unit-select');
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('rememberedUser');
      }
      setCurrentUser(null);
      window.location.reload();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartPractice();
    }
  };

  const handleHelpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('跳转到帮助页面');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('跳转到联系我们页面');
  };

  const handleStartButtonFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.outline = '2px solid rgba(79, 70, 229, 0.5)';
    e.target.style.outlineOffset = '4px';
  };

  const handleStartButtonBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.outline = 'none';
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
            
            {/* 右侧占位（未来可添加用户信息） */}
            <div className="flex items-center space-x-4">
              {/* 用户登录状态显示 */}
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-textPrimary font-medium hidden md:inline">
                    {currentUser.username}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="text-textSecondary hover:text-danger transition-colors"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              ) : (
                /* 登录按钮 */
                <Link 
                  to="/login"
                  className={`${styles.glassButton} rounded-full px-4 py-1.5 text-sm font-medium text-textPrimary hover:text-primary transition-all duration-300`}
                >
                  <i className="fas fa-user mr-1"></i>
                  登录
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 欢迎区域 */}
          <section className={`${styles.glassCard} rounded-3xl p-8 mb-8 text-center`}>
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-4">
                欢迎来到 <span className="text-primary">文海拾贝</span> 📚
              </h1>
              <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
                专为六年级学生打造的语文练习平台，让学习更高效、更有趣！
              </p>
            </div>
            
            {/* 特色功能展示 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`${styles.glassCard} ${styles.floatingAnimation} ${styles.floatingAnimationDelay0} rounded-2xl p-6 text-center`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-pen-fancy text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">系统练习</h3>
                <p className="text-textSecondary text-sm">覆盖所有课文单元的练习题</p>
              </div>
              
              <div className={`${styles.glassCard} ${styles.floatingAnimation} ${styles.floatingAnimationDelay1} rounded-2xl p-6 text-center`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-tertiary to-accent mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-file-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">模拟考试</h3>
                <p className="text-textSecondary text-sm">期中期末模拟卷，熟悉考试形式</p>
              </div>
              
              <div className={`${styles.glassCard} ${styles.floatingAnimation} ${styles.floatingAnimationDelay2} rounded-2xl p-6 text-center`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-primary mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-download text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">离线练习</h3>
                <p className="text-textSecondary text-sm">支持导出打印，随时随地练习</p>
              </div>
            </div>
            
            {/* 开始练习按钮 */}
            <div className="mb-8">
              <button 
                onClick={handleStartPractice}
                onKeyDown={handleKeyDown}
                onFocus={handleStartButtonFocus}
                onBlur={handleStartButtonBlur}
                className={`${styles.glassButton} ${styles.pulseGlow} rounded-2xl px-12 py-4 text-xl font-bold text-textPrimary hover:text-primary transition-all duration-300`}
                tabIndex={0}
              >
                <i className="fas fa-play mr-3"></i>
                开始练习
              </button>
            </div>
            
            {/* 学习数据概览 */}
            <div className={`${styles.glassCard} rounded-2xl p-6`}>
              <h3 className="text-xl font-semibold text-textPrimary mb-4">学习概览</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">12</div>
                  <div className="text-sm text-textSecondary">单元总数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-tertiary mb-1">8</div>
                  <div className="text-sm text-textSecondary">已完成</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">92%</div>
                  <div className="text-sm text-textSecondary">正确率</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">5</div>
                  <div className="text-sm text-textSecondary">连续天数</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 最近活动 */}
          <section className={`${styles.glassCard} rounded-3xl p-8`}>
            <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">最近活动</h2>
            <div className="space-y-4">
              <div className={`flex items-center space-x-4 p-4 ${styles.glassCard} rounded-xl`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-textPrimary">完成第三单元练习</h4>
                  <p className="text-sm text-textSecondary">得分：95分 | 用时：25分钟</p>
                </div>
                <span className="text-sm text-textSecondary">2小时前</span>
              </div>
              
              <div className={`flex items-center space-x-4 p-4 ${styles.glassCard} rounded-xl`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-tertiary to-accent flex items-center justify-center">
                  <i className="fas fa-file-download text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-textPrimary">下载期中模拟卷</h4>
                  <p className="text-sm text-textSecondary">准备进行模拟考试</p>
                </div>
                <span className="text-sm text-textSecondary">昨天</span>
              </div>
              
              <div className={`flex items-center space-x-4 p-4 ${styles.glassCard} rounded-xl`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                  <i className="fas fa-star text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-textPrimary">获得"语文小达人"徽章</h4>
                  <p className="text-sm text-textSecondary">连续7天练习达成</p>
                </div>
                <span className="text-sm text-textSecondary">3天前</span>
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
              <a 
                href="#" 
                onClick={handleHelpClick}
                className="text-textSecondary hover:text-primary transition-colors"
              >
                <i className="fas fa-question-circle"></i>
                <span className="ml-1">帮助</span>
              </a>
              <a 
                href="#" 
                onClick={handleContactClick}
                className="text-textSecondary hover:text-primary transition-colors"
              >
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

export default HomePage;

