function loginStatus(info) {
  const users = [
    {
      firstName: 'Tony',
      email: 'tony@stark.com',
      password: 'iamironman'
    },
    {
      firstName: 'Steve',
      email: 'captain@hotmail.com',
      password: 'icandothisallday'
    },
    {
      firstName: 'Peter',
      email: 'peter@parker.com',
      password: 'enajyram'
    },
    {
      firstName: 'Natasha',
      email: 'natasha@gamil.com',
      password: '*parol#@$!'
    },
    {
      firstName: 'Nick',
      email: 'nick@shield.com',
      password: 'password'
    }
  ]

  if (info.email.length === 0 || info.password.length === 0) {
    return `Please enter your information`
  }
  for (let i = 0; i < users.length; i++) {
    //console.log(users[i].email)
    //console.log(users[i].password)
    if (users[i].email === info.email && users[i].password === info.password) {
      return users[i].firstName
    }
  }
  return 'Incorrect Email or Password'

}
module.exports = loginStatus