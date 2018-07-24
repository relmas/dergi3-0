// funzione da chiamare quando un utente clicca su uno sport
// per caricare la lista relativa
function loadSportList(text)
{
	// contenuto statico e fisso della nuova pagina
	var pageOpening = '<div class="page" data-page="list">'
					+'<div class="navbar">'
					+ '<div class="navbar-inner">'
					+  '<div class="left">'
					+   '<a href="#" class="link icon-only">'
					+    '<i class="icon icon-back"></i>'
					+   '</a>'
					+  '</div>'
					+  '<div class="center">'+text+'</div>'
					+  '<div class="right">'
					+  '</div>'
					+'</div>'
					
					+'</div>'
					+  '<div class="page-content contacts-content">'

					+	 '<ul>'

	var pageClosing = 	 '</ul>' 
					+ '</div>';

	var dynList = '';


	{
		dynList +=  '<iframe allowfullscreen="true" frameborder="0" src="https://drive.google.com/file/d/'+text+'/preview" style="position:absolute; top:0; left:0; width:100%; height:100%;" webkit=""></iframe>';
	}
	 
	// con questo comando si carica il contenuto appena creato
	mainView.router.load(
	{
	  content: pageOpening + dynList + pageClosing,
	  animatePages: true
	});
	
	// qui dico al bottone in alto a sx di tornare indietro se schiacciato
	$$('.left').on('click', function() 
	{
		loadIndex();
	});
	
	// cosa succede se si vuole andare alla mappa
	$$('.mapLink').on('click', function() 
	{
		loadMap(locations, "img/wiki.png", text);
	});
	
	// cosa succede se si clicca su una societa'
	$$('.soc-link').on('click', function() 
	{
		var id = $$(this).attr("id");
		// estrai il numero dall'id
		var socNumber = new Number(id.substring(id.indexOf("-")+1));
		
		// chiama la funzione per caricare il dettaglio della societa' e
		// passa alla funzione l'oggetto-societa' 
		loadDetail(socNumber);
	});
	
	// quasi quasi adesso..mentre la gente guarda la lista,
	// noi estraiamo le coordinate dagli indirizzi per poi costruire i markers
	clubs = [""];
	locations = [];	
	locationCounter = 0;
	geocoder = new google.maps.Geocoder();
	geoCode()
}

var clubs = [""];
var locations = [];	
var locationCounter = 0;
var geocoder;

function geoCode()
{
	geocoder.geocode(
	{
		'address': clubs[locationCounter]
	}, function(results, status) 
	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
			// aggiungi la posizione all'array
			locations.push(results[0].geometry.location);
		}
		
		locationCounter++;
		if (locationCounter < clubs.length)
		{
			geoCode()
		}
		else // finito di estrarre gli indirizzi
		{
			// do nothing
			// myApp.alert("total addresses: "+locations.length);
		}
	});
}