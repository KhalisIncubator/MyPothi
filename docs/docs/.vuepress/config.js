module.exports = {
  title: 'MyPothi Documentation',
  description: 'Contributing Guide and Code Documentation for MyPothi',
  themeConfig: {

    nav: [
      {text: 'Home', link: '/'},
      {text: 'Intro', link: '/intro_docs/contributing'},
      {text: 'Code', link: '/code_docs/src/overview'},
      // {text: 'Managment', link: '/pm_docs'}
    ],


    sidebarDepth: 2,
    sidebar:{
      '/intro_docs': [
        '/intro_docs/contributing',
        '/intro_docs/development',
        '/intro_docs/codetooling',
        '/intro_docs/howtouse',

      ],
      '/code_docs': [
        '/code_docs/dependencies',
        {
          title: 'Src',
          children: [
            '/code_docs/src/overview',
            '/code_docs/src/hooks'
          ]
        },
        {
          title: 'Screens',
          children: [
            '/code_docs/screens/overview'
          ]
        },
        {
          title: 'Components',
          children: [
            '/code_docs/components/overview'
          ]
        },
        {
          title: 'Database',
          children: [
            '/code_docs/database/overview'
            
          ]
        },
        {
          title: 'Store',
          children: [
            '/code_docs/store/overview'
            
          ]
        }
      ]
    }
  }
}