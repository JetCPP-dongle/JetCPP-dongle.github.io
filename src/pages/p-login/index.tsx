

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import styles from './styles.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  
  // 登录表单状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // 注册表单状态
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '登录 - 文海拾贝';
    return () => { 
      document.title = originalTitle; 
    };
  }, []);

  // 检查是否已登录
  useEffect(() => {
    if (user && !loading) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  // 切换密码可见性
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 切换注册密码可见性
  const handleToggleRegPassword = () => {
    setShowRegPassword(!showRegPassword);
  };

  // 打开注册模态框
  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };

  // 关闭注册模态框
  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  // 点击模态框外部关闭
  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowRegisterModal(false);
    }
  };

  // 登录表单提交
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setLoginError(error.message);
      } else {
        // 登录成功，自动跳转到主页
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }
    } catch (error) {
      setLoginError('登录失败，请重试');
    }
  };

  // 注册表单提交
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterError('');
    
    // 验证密码
    if (regPassword !== regConfirmPassword) {
      setRegisterError('两次输入的密码不一致，请重新输入');
      return;
    }
    
    if (regPassword.length < 6) {
      setRegisterError('密码长度至少为6个字符');
      return;
    }
    
    try {
      const { error } = await signUp(regEmail, regPassword, regUsername);
      
      if (error) {
        setRegisterError(error.message);
      } else {
        // 注册成功，关闭模态框
        setShowRegisterModal(false);
        alert('注册成功！请检查邮箱并确认注册。');
      }
    } catch (error) {
      setRegisterError('注册失败，请重试');
    }
  };

  // 忘记密码处理
  const handleForgotPassword = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (!email) {
      alert('请先输入邮箱地址');
      return;
    }
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        alert('发送重置邮件失败：' + error.message);
      } else {
        alert('密码重置邮件已发送，请检查您的邮箱。');
      }
    } catch (error) {
      alert('发送重置邮件失败，请重试');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 登录卡片 */}
      <div className={`${styles.glassCard} rounded-3xl p-8 w-full max-w-md mx-4`}>
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-book-open text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-textPrimary">欢迎回来</h1>
          <p className="text-textSecondary mt-2">登录您的账户继续学习</p>
        </div>
        
        {/* 登录表单 */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* 邮箱输入 */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-textPrimary">
              邮箱
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-textSecondary"></i>
              </div>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-4 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                placeholder="请输入邮箱" 
                required 
              />
            </div>
          </div>
          
          {/* 错误提示 */}
          {loginError && (
            <div className="text-red-500 text-sm text-center">
              {loginError}
            </div>
          )}
          
          {/* 密码输入 */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-textPrimary">
              密码
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-textSecondary"></i>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-10 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                placeholder="请输入密码" 
                required 
              />
              <button 
                type="button" 
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-textSecondary"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          
          {/* 记住我和忘记密码 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember-me" 
                name="remember-me" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-textSecondary">
                记住我
              </label>
            </div>
            <a 
              href="#" 
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              忘记密码?
            </a>
          </div>
          
          {/* 登录按钮 */}
          <button 
            type="submit" 
            className={`w-full ${styles.glassButton} ${styles.pulseGlow} rounded-xl px-4 py-3 text-lg font-bold text-textPrimary hover:text-primary transition-all duration-300`}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            登录
          </button>
          
          {/* 注册链接 */}
          <div className="text-center">
            <span className="text-textSecondary">还没有账户?</span>
            <button 
              type="button" 
              onClick={handleOpenRegisterModal}
              className="ml-1 text-primary font-medium hover:text-primary/80 transition-colors"
            >
              立即注册
            </button>
          </div>
        </form>
      </div>
      
      {/* 注册模态框 */}
      {showRegisterModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className={`${styles.glassCard} rounded-3xl p-8 w-full max-w-md mx-4`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-textPrimary">创建账户</h2>
              <button 
                onClick={handleCloseRegisterModal}
                className="text-textSecondary hover:text-textPrimary"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="reg-email" className="block text-sm font-medium text-textPrimary">
                  邮箱
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-textSecondary"></i>
                  </div>
                  <input 
                    type="email" 
                    id="reg-email" 
                    name="reg-email" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-4 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                    placeholder="请输入邮箱" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reg-username" className="block text-sm font-medium text-textPrimary">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-textSecondary"></i>
                  </div>
                  <input 
                    type="text" 
                    id="reg-username" 
                    name="reg-username" 
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-4 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                    placeholder="请设置用户名" 
                    required 
                  />
                </div>
              </div>
              
              {/* 错误提示 */}
              {registerError && (
                <div className="text-red-500 text-sm text-center">
                  {registerError}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="reg-password" className="block text-sm font-medium text-textPrimary">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-textSecondary"></i>
                  </div>
                  <input 
                    type={showRegPassword ? 'text' : 'password'} 
                    id="reg-password" 
                    name="reg-password" 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-10 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                    placeholder="请设置密码" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={handleToggleRegPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-textSecondary"
                  >
                    <i className={`fas ${showRegPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                <p className="text-xs text-textSecondary">密码至少包含6个字符</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-textPrimary">
                  确认密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-textSecondary"></i>
                  </div>
                  <input 
                    type="password" 
                    id="reg-confirm-password" 
                    name="reg-confirm-password" 
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className={`${styles.glassCard} ${styles.inputFocus} w-full pl-10 pr-4 py-3 rounded-xl text-textPrimary placeholder-textSecondary`}
                    placeholder="请再次输入密码" 
                    required 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`w-full ${styles.glassButton} rounded-xl px-4 py-3 text-lg font-bold text-textPrimary hover:text-primary transition-all duration-300`}
              >
                <i className="fas fa-user-plus mr-2"></i>
                注册
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

