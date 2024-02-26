	
function checkLogForm(){
	var user = logForm.user;
	var pass = logForm.password;
	var spanError;
	
	var patternUser = /^[a-zA-Z0-9._-]{4,15}$/g;
	var patternPass = /^[a-zA-Z0-9.]{4,15}$/g;
	
	if(!patternUser.test(user.value)){
		spanError = document.getElementById("errorLogUser");
		spanError.innerHTML = "L'username: <br/>" +
				"-deve essere lungo tra i 4 e 15 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere, numeri e caratteri speciali come \".\"  \"_\"  \"-\")";
		document.getElementById("errorLog").innerHTML = "";
		user.focus();
		
		return false;
	}
	
	if(!patternPass.test(pass.value)){
		spanError = document.getElementById("errorLogPass");
		spanError.innerHTML = "La password: <br/>" +
				"-deve essere lunga tra i 4 e 15 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere, numeri e caratteri come \".\")";
		document.getElementById("errorLog").innerHTML = "";
		pass.focus();
		
		return false;
	}
	
	return true;
}

function checkSignForm(){
	var user = signForm.user;
	var pass = signForm.password;
	var name = signForm.name;
	var surname = signForm.surname;
	var birthDate = signForm.birthDate;
	var address = signForm.address;
	var spanError;
	
	var patternUser = /^[a-zA-Z0-9._-]{4,15}$/g;
	var patternPass = /^[a-zA-Z0-9.]{4,15}$/g;
	var patternName = /^[a-zA-Z]{1,20}$/g;
	var patternSurname = /^[a-zA-Z]{1,20}$/g;
	var patternBirthDate = /^\d{4}(-|\/)\d{2}(-|\/)\d{2}$/g;
	var patternAddress = /^[a-zA-Z0-9 ]{1,30}$/g;
	
	if(!patternUser.test(user.value)){
		spanError = document.getElementById("errorSignUser");
		spanError.innerHTML = "L'username: <br/>" +
				"-deve essere lungo tra i 4 e 15 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere, numeri e caratteri speciali come \".\"  \"_\"  \"-\")";
		document.getElementById("errorSign").innerHTML = "";
		user.focus();
		
		return false;
	}
	
	if(!patternPass.test(pass.value)){
		spanError = document.getElementById("errorSignPass");
		spanError.innerHTML = "La password: <br/>" +
				"-deve essere lunga tra i 4 e 15 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere, numeri e caratteri come \".\")";
		document.getElementById("errorSign").innerHTML = "";
		pass.focus();
		
		return false;
	}
	
	if(!patternName.test(name.value)){
		spanError = document.getElementById("errorSignName");
		spanError.innerHTML = "Il nome: <br/>" +
				"-non pu&ograve; essere vuoto o avere più di 20 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere)";
		document.getElementById("errorSign").innerHTML = "";
		name.focus();
		
		return false;
	}
	
	if(!patternSurname.test(surname.value)){
		spanError = document.getElementById("errorSignSurname");
		spanError.innerHTML = "Il cognome: <br/>" +
				"-non pu&ograve; essere vuoto o avere più di 20 caratteri; <br/>" +
				"-pu&ograve; contenere solo lettere)";
		document.getElementById("errorSign").innerHTML = "";
		surname.focus();
		
		return false;
	}
	
	if(!patternBirthDate.test(birthDate.value)){
		spanError = document.getElementById("errorSignBirth");
		spanError.innerHTML = "La data di nascita deve avere un formato del tipo YYYY/MM/DD";
		document.getElementById("errorSign").innerHTML = "";
		birthDate.focus();
		
		return false;
	}
	
	if(!patternAddress.test(address.value)){
		spanError = document.getElementById("errorSignAddress");
		spanError.innerHTML = "L'indirizzo può contenere solo lettere e deve essere lungo massimo 30 caratteri";
		document.getElementById("errorSign").innerHTML = "";
		address.focus();
		
		return false;
	}
	
	return true;
}

const buttonSubmitSign = document.querySelector("form[name=signForm] input[value=Registrati]");
buttonSubmitSign.addEventListener("click", function(event) {
	event.preventDefault();

	fetch("http://localhost:3030/signup", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({
			username: document.querySelector("form[name=signForm] input[name=username]").value,
			password: document.querySelector("form[name=signForm] input[name=password]").value,
			email: document.querySelector("form[name=signForm] input[name=email]").value
		})
	}).then(result => result.json()).then(response => {
		const span = document.querySelector("span#errorSign");
		span.innerHTML = response.success;
		span.style.display = "inline-block";
	}).catch(err => {
		console.log(err);
	})
});

const buttonSubmitLog = document.querySelector("form[name=logForm] input[value=Entra]");
buttonSubmitLog.addEventListener("click", function(event) {
	event.preventDefault();

	fetch("http://localhost:3030/login", {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({
			username: document.querySelector("form[name=logForm] input[name=username]").value,
			password: document.querySelector("form[name=logForm] input[name=password]").value,
		})
	}).then(result => result.json()).then(response => {
		const span = document.querySelector("span#errorLog");
		span.innerHTML = response.success;
		span.style.display = "inline-block";
		document.cookie = "token=" + decodeURIComponent(response.token)
	}).catch(err => {
		console.log(err);
	})
});