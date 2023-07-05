module.exports = {
    content: [
      './docs/.vitepress/**/*.js',
      './docs/.vitepress/**/*.vue',
      './docs/.vitepress/**/*.ts',
    ],
    options: {
      safelist: ['html', 'body'],
    },
    theme: {
      extend:{
        colors:{
          'primary-100':'#b4e7ff', 
          'primary-200':'#81d8ff',
          'primary-300':'#4ac9ff',
          'primary-400':'#19bcff',
          'primary-500':'#00b0ff',
          'primary-600':'#00a1f7',
          'primary-700':'#008ee2',
          'primary-800':'#007dce',
          'primary-900':'#005BAC',
          'light-back-primary':'#ffffff',
          'light-back-secondary':'#F0F2F5',
          'light-back-tertiary':'#E2E5E9',
          'light-text-primary':'#333333',
          'light-text-secondary':'#79797A',
          'dark-back-primary':'#232B33',
          'dark-back-secondary':'#1E262E',
          'dark-back-tertiary':'#353A41',
          'dark-text-primary':'#F2F5F8',
          'dark-text-secondary':'#8795A3',
        }
      }
    }
}
