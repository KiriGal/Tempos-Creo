"use strict"

let flag = true;

const list = document.querySelectorAll('.switch_button')
list.forEach(item =>{ 
    item.addEventListener('click', (e) =>{
        flag = !flag;
        list.forEach(el=>{ 
            el.classList.remove('active');
        });
        item.classList.add('active')
        
        handlerClick(flag);
    })
})

const handlerClick = (flag) => {
    console.log(flag)
    let form = document.getElementsByClassName("login_form")[0];
    if(flag){
        document.getElementsByClassName("login_title")[0].innerHTML = "С возвращением";
        form.innerHTML = `
            <input type="email" class="login_input" placeholder="Почта">
            <input type="password" class="login_input" placeholder="Пароль">
            <button class="login_button">Вход</button>
        `;
    }else{
        document.getElementsByClassName("login_title")[0].innerHTML = "Приветствуем";
        form.innerHTML = `
            <input type="text" class="login_input" placeholder="Имя">
            <input type="text" class="login_input" placeholder="Фамилия">
            <input type="email" class="login_input" placeholder="Почта">
            <input type="password" class="login_input" placeholder="Пароль">
            <button class="login_button">Регистрация</button>
        `;
    }
}