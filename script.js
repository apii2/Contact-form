let form = document.forms['myForm'];
form.addEventListener('submit',validateForm);

function validateForm(event){
  try{
    event.preventDefault();

    let isValid = true;

    let validateData = [
      {
        'name': 'fname',
        'error': 'f_error',
        'check': /^[A-Za-z]{3,}$/
      },
      {
        'name': 'lname',
        'error': 'l_error',
        'check': /^[A-Za-z]{3,}$/
      },
      {
        'name': 'query_type',
        'error': 'q_error',
        'check': /[A-Za-z]/
      },
      {
        'name': 'message',
        'error': 'm_error',
        'check': /[A-Za-z]/
      },
      {
        'name': 'consent',
        'error': 'c_error',
        'check': /[A-Za-z]/
      },
    ];

    validateData.forEach((item)=>{
      let input = form[item.name];

      if(input.type === 'checkbox'){
        if(!input.checked){
          form.querySelector(`.${item.error}`).classList.remove('d-none');
          isValid = false;
        }else {
          form.querySelector(`.${item.error}`).classList.add('d-none');
        }

      }else {
        if(!item.check.test(input.value)){
          form.querySelector(`.${item.error}`).classList.remove('d-none');
          if(item.name !== 'query_type'){
            input.classList.add('border-red');
          }
          isValid = false;
        }else {
          form.querySelector(`.${item.error}`).classList.add('d-none');
          if(item.name !== 'query_type'){
            input.classList.remove('border-red');
          }
        }
      }

    })

    let email = form.querySelector('#email').value;
    if(!email || email.length < 3){
      form.querySelector('.e_error').classList.remove('d-none');
      form.querySelector('.emailerror').classList.add('d-none');
      form.querySelector('#email').classList.add('border-red');
      isValid = false;
    }else if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ){
      form.querySelector('.emailerror').classList.remove('d-none');
      form.querySelector('.e_error').classList.add('d-none');
      form.querySelector('#email').classList.add('border-red');
      isValid = false;
    }else{
      form.querySelector('.emailerror').classList.add('d-none');
      form.querySelector('.e_error').classList.add('d-none');
      form.querySelector('#email').classList.remove('border-red');
    }

    if(isValid){
      form.querySelector('.success').classList.remove('d-none');
      setTimeout(()=>{
        form.submit();
      },2000);    
    }
  } catch(err){
    console.error(err);
  }
}