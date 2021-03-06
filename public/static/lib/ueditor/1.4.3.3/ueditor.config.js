
(function() {
  var URL = '/static/lib/ueditor/1.4.3.3/' || getUEBasePath()

  /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
  window.UEDITOR_CONFIG = {

    // 为编辑器实例添加一个路径，这个不能被注释
    UEDITOR_HOME_URL: URL,
    // 服务器统一请求接口路径
    serverUrl: URL + 'jsp/controller.jsp',

    // 工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的重新定义
    toolbars: [[
      'source', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'pasteplain', '|', 'forecolor', 'backcolor', 'selectall', 'cleardoc', '|',
      'fontfamily', 'fontsize'
    ]],
    autoFloatEnabled: false,
    initialFrameHeight: 150,
    initialFrameWidth: '100%',
    allowDivTransToP: false,
    // xss 过滤是否开启,inserthtml等操作
    xssFilterRules: true,
    // input xss过滤
    inputXssFilter: true,
    // output xss过滤
    outputXssFilter: true,
    // xss过滤白名单 名单来源: https://raw.githubusercontent.com/leizongmin/js-xss/master/lib/default.js
    whitList: {
      a: ['target', 'href', 'title', 'class', 'style'],
      abbr: ['title', 'class', 'style'],
      address: ['class', 'style'],
      area: ['shape', 'coords', 'href', 'alt'],
      article: [],
      aside: [],
      audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
      b: ['class', 'style'],
      bdi: ['dir'],
      bdo: ['dir'],
      big: [],
      blockquote: ['cite', 'class', 'style'],
      br: [],
      caption: ['class', 'style'],
      center: [],
      cite: [],
      code: ['class', 'style'],
      col: ['align', 'valign', 'span', 'width', 'class', 'style'],
      colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
      dd: ['class', 'style'],
      del: ['datetime'],
      details: ['open'],
      div: ['class', 'style'],
      dl: ['class', 'style'],
      dt: ['class', 'style'],
      em: ['class', 'style'],
      font: ['color', 'size', 'face'],
      footer: [],
      h1: ['class', 'style'],
      h2: ['class', 'style'],
      h3: ['class', 'style'],
      h4: ['class', 'style'],
      h5: ['class', 'style'],
      h6: ['class', 'style'],
      header: [],
      hr: [],
      i: ['class', 'style'],
      img: ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex'],
      ins: ['datetime'],
      li: ['class', 'style'],
      mark: [],
      nav: [],
      ol: ['class', 'style'],
      p: ['class', 'style'],
      pre: ['class', 'style'],
      s: [],
      section: [],
      small: [],
      span: ['class', 'style'],
      sub: ['class', 'style'],
      sup: ['class', 'style'],
      strong: ['class', 'style'],
      table: ['width', 'border', 'align', 'valign', 'class', 'style'],
      tbody: ['align', 'valign', 'class', 'style'],
      td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
      tfoot: ['align', 'valign', 'class', 'style'],
      th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
      thead: ['align', 'valign', 'class', 'style'],
      tr: ['rowspan', 'align', 'valign', 'class', 'style'],
      tt: [],
      u: [],
      ul: ['class', 'style'],
      video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style']
    }
  }

  function getUEBasePath(docUrl, confUrl) {
    return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath())
  }

  function getConfigFilePath() {
    var configPath = document.getElementsByTagName('script')

    return configPath[ configPath.length - 1 ].src
  }

  function getBasePath(docUrl, confUrl) {
    var basePath = confUrl

    if (/^(\/|\\\\)/.test(confUrl)) {
      basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '')
    } else if (!/^[a-z]+:/i.test(confUrl)) {
      docUrl = docUrl.split('#')[0].split('?')[0].replace(/[^\\\/]+$/, '')

      basePath = docUrl + '' + confUrl
    }

    return optimizationPath(basePath)
  }

  function optimizationPath(path) {
    var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ]
    var tmp = null
    var res = []

    path = path.replace(protocol, '').split('?')[0].split('#')[0]

    path = path.replace(/\\/g, '/').split(/\//)

    path[ path.length - 1 ] = ''

    while (path.length) {
      if ((tmp = path.shift()) === '..') {
        res.pop()
      } else if (tmp !== '.') {
        res.push(tmp)
      }
    }

    return protocol + res.join('/')
  }

  window.UE = {
    getUEBasePath: getUEBasePath
  }
})()
