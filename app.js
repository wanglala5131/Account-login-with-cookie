const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const loginStatus = require('./login')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('123'))
app.use(express.static('./public'))

app.get('/', (req, res) => {
  //如果cookie存在，就直接render /success
  if (req.signedCookies.welcome) {
    let results = req.signedCookies.welcome   //把網頁路徑改成/success
    res.redirect('success')
    //若沒有cookie就進入身分驗證頁面
  } else {
    res.render('index')
  }
})
app.post('/', (req, res) => {
  let results = loginStatus(req.body) //results為firstname或錯誤訊息
  const email = req.body.email
  //信箱與密碼錯誤或沒填
  if (results === 'Please enter your information' || results === 'Incorrect Email or Password') {
    res.render('index', { results: results, email: email })

    //信箱密碼正確，，此處創造cookie並轉去/success
  } else {
    res.cookie('welcome', results, { path: '/', httpOnly: true, signed: true })
    res.redirect('success')
  }
})

app.get('/success', (req, res) => {
  //若沒有cookie，不能進入此頁面，會跳回身分驗證頁面
  if (!req.signedCookies.welcome) {
    res.redirect('/')

    //若有cookie，會取cookie的value作為使用者名稱  
  } else {
    res.render('success', { results: req.signedCookies.welcome })
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('welcome', { path: '/' })
  return res.redirect('/')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})



