// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
(function() {
  var initialize = function() {
    var dept1=document.getElementById("dept1");
    var dept2=document.getElementById("dept2");
    var submitbutton=document.getElementById("submit");
    submitbutton.addEventListener("click",onSubmit);
    dept1.addEventListener("change",disableDuplicateSecondaryDepartment);

    /*
      1. Add all your event bindings here. Please avoid binding events inline and add your event listeners here.

      onSubmit callback
      disableDuplicateSecondaryDepartment callback,...
    */
  };

  var disableDuplicateSecondaryDepartment = function(event) {
    var dept1=document.getElementById("dept1");
    var seldept=dept1.options[dept1.selectedIndex].value;
    var opt = document.getElementById("dept2");
    for (var i=0;i<opt.length;++i)
    {
      if (opt[i].value==seldept)
      {
        opt[i].disabled=true;
      }
      else
      {
        opt[i].disabled=false;
      }
    }
    // 2. in department2, Should disable the option selected in department1
  }

  var constructData = function() {
    var data = {};

    // 3. Construct data from the form here. Please ensure that the keys are the names of input elements
    data["name"]=document.getElementById("name").value;
    data["phno"]=document.getElementById("phno").value;
    data["emailaddress"]=document.getElementById("emailaddress").value;
    data["department1"]=document.getElementById("dept1").value;
    data["department2"]=document.getElementById("dept2").value;
    return data;
  }

  var validateResults = function(data) {
    var isValid = true;
    var emailformat=/^[a-zA-Z0-9.]+@college.edu$/;
    if (data["name"].length>100)
    {
      isValid=false;
    }
    else if (data["phno"].length!=10)
    {
      isValid=false;
    }
    else if (!emailformat.test(data["emailaddress"]))
    {
      isValid=false;
    }
    else if (data["department1"]==data["department2"])
    {
      isValid=false;
    }
    // 4. Check if the data passes all the validations here

    return isValid;
  };

  var onSubmit = function(event) {
    var data = constructData();

    if (validateResults(data)) {
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      resultsDiv.classList.add("hide");
    }
    event.preventDefault();
  };

  var printResults = function(data) {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      debugger
      return innerHtml + constructElement(keyValuePair);
    }, '');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  /*
    Initialize the javascript functions only after the html DOM content has loaded.
    This is to ensure that the elements are present in the DOM before binding any event listeners to them.
  */
  document.addEventListener('DOMContentLoaded', initialize);
})();
