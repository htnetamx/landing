import info from '../assets/data.js'
document.getElementById("Comprar_Con_Nosotros").addEventListener("click", fillAndShowDelegaciones);
document.getElementById("delegacion").addEventListener("change", fillAndShowColonias);
document.getElementById("colonia").addEventListener("change", fillAndShowTiendas);
document.getElementById("tienda").addEventListener("change", GoToUrl);

var delegacion_boton=document.getElementById("delegacion")
var colonia_boton=document.getElementById("colonia")
var tienda_boton=document.getElementById("tienda")

function fillAndShowDelegaciones(){
    var x = document.getElementById("DDelegacion");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    var data_Delegaciones = DistinctRecords(info.data,"Tienda_Delegacion").sort(sortByProperty("Tienda_Delegacion"));
    var delegacion=document.getElementById('delegacion');
    var option;

    for (let i = 0; i < data_Delegaciones.length; i++) {
        option=document.createElement("option");
        option.text=data_Delegaciones[i].Tienda_Delegacion;
        delegacion.appendChild(option);
    }
}

function fillAndShowColonias(){
    var delegacion=delegacion_boton.options[delegacion_boton.selectedIndex].value;
    var colonia=document.getElementById('colonia');
    var tienda=document.getElementById('tienda');
    var x = document.getElementById("DColonia");
    var y = document.getElementById("DTienda");
    var option;
    colonia.innerHTML="";
    option=document.createElement("option");
    option.text="Seleccione la Colonia";
    colonia.appendChild(option);
    tienda.innerHTML="";
    option=document.createElement("option");
    option.text="Seleccione la Tienda";
    tienda.appendChild(option);


    if (x.style.display === "block") {
        x.style.display = "none";
    }
    if (y.style.display === "block") {
        y.style.display = "none";
    }
    
    if(delegacion!='Seleccione la Delegación'){
        if (x.style.display === "none") {
             x.style.display = "block";
        }
        var data_Colonias = info.data.filter(function (currentElement) {
            return currentElement.Tienda_Delegacion === delegacion;
        });
        data_Colonias = DistinctRecords(data_Colonias,"Tienda_Colonia").sort(sortByProperty("Tienda_Colonia"));
      
        for (let i = 0; i < data_Colonias.length; i++) {
            option=document.createElement("option");
            option.text=data_Colonias[i].Tienda_Colonia;
            colonia.appendChild(option);
        }
    }
}

function fillAndShowTiendas(){
    var delegacion=delegacion_boton.options[delegacion_boton.selectedIndex].value;
    var colonia=colonia_boton.options[colonia_boton.selectedIndex].value;
    var tienda=document.getElementById('tienda');
    var option;
    tienda.innerHTML="";
    option=document.createElement("option");
    option.text="Seleccione la Tienda";
    tienda.appendChild(option);
    var x = document.getElementById("DTienda");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    if(colonia=='Seleccione la Colonia' || delegacion=='Seleccione la Delegación'){
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    else{
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        var data_Tiendas = info.data.filter(function (currentElement) {
            return currentElement.Tienda_Delegacion === delegacion && currentElement.Tienda_Colonia===colonia;
        });
        data_Tiendas = DistinctRecords(data_Tiendas,"Tienda_Nombre").sort(sortByProperty("Tienda_Nombre"));
        
    
        for (let i = 0; i < data_Tiendas.length; i++) {
            option=document.createElement("option");
            option.text=data_Tiendas[i].Tienda_Nombre;
            tienda.appendChild(option);
        }
    }
}

function DistinctRecords(MYJSON,prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
   })
  }

function sortByProperty(property){  
    return function(a,b){
       var str1=String(a[property])
       var str2=String(b[property])
       str1=str1[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "")+ str1.slice(1);
       str2=str2[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "")+ str1.slice(1);
       if(str1 > str2)  
          return 1;  
       else if(str1 < str2)  
          return -1;  
   
       return 0;  
    }  
 }

function GoToUrl(){
    var delegacion=delegacion_boton.options[delegacion_boton.selectedIndex].value;
    var colonia=colonia_boton.options[colonia_boton.selectedIndex].value;
    var tienda=tienda_boton.options[tienda_boton.selectedIndex].value;
    var full_tienda = info.data.filter(function (currentElement) {
        return currentElement.Tienda_Delegacion === delegacion && currentElement.Tienda_Colonia===colonia && currentElement.Tienda_Nombre===tienda;
    });
    window.location.replace(full_tienda[0].Tienda_Url)
}
