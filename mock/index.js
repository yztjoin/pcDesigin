const mockjs = require('mockjs');
//mock接口 文档地址 https://github.com/nuysoft/Mock/wiki
module.exports = (app) => {
  app.get("/mock/getUserInfo", (req, res) => {
    res.json({
      State: 1,
      Body: mockjs.mock({
        'username': "@name()",
        "userid": "@id()",
        "date": "@date()",
        "email": "@email",
        "image": "@image('200x200','red','#fff','avatar')"
      }),
      Msg:mockjs.Random.paragraph(0,1)
    })
  })
  //其它Mock接口追加 即可
  //如 app.get("/mock/testOne",(req,res)=>res.json({a:1}))
}
