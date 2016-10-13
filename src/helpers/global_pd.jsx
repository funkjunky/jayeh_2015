//A global function to preventDefault and return false. super convinient for onSubmit for forms.
if(!globals)
    var globals = globals || {};
//usage: onSubmit={ pd((event) => login(event.target)) }
var pd = globals.pd = (fnc) => (event) => {
    event.preventDefault();
    fnc(event);
    return false;
};
