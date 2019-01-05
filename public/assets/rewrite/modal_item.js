var current_location = "";

var projects = [];

for(var i = 0; i < projects.length; i++){
	if(projects[i]['id'] == req.body.id){
		current_location = projects[i];
		break;
	}
}

var latitude, longitude, address;

latitude = current_location['latitude']?current_location['latitude'] : '';
longitude = current_location['longitude']?current_location['longitude'] : '';
address = current_location['address']?current_location['address'] : '';

var response_data = `<div class="modal-item-detail modal-dialog" role="document" data-latitude=" ${latitude}" data-longitude="${longitude}" data-address="${address}">
					    <div class="modal-content">
					        <div class="modal-header">
					            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					            <div class="section-title">
					                <h2>${current_location['title']} </h2>
					                <div class="label label-default">${current_location['category']}</div>
					                <div class="controls-more">
					                    <ul>
					                        <li><a href="#">Add to favorites</a></li>
					                        <li><a href="#">Add to watchlist</a></li>
					                    </ul>
					                </div>
					                <!--end controls-more-->
					            </div>
					            <!--end section-title-->
        					</div>
        					<div class="modal-body">
            					<div class="left">`;

var gallery = '';
for(var i = 0; i < current_location['gallery']; i++){
	gallery += `<img src="${current_location['gallery'][i]}" alt="project image gallery">`
}

response_data += current_location['gallery']?`<div class="gallery owl-carousel" data-owl-nav="1" data-owl-dots="0"> ${gallery}</div><div class="map" id="map-modal"></div><!--end map--><section>`:'';
response_data += current_location['location']?`<h5><i class="fa fa-map-marker"></i>${current_location['location']}</h5></section>
                <section>
                    <h3>Social Share</h3>
                    <div class="social-share"></div>
                </section>
            </div>
            <!--end left -->
            <div class="right">
                <section>
                    <h3>About</h3>
                    <div class="read-more"><p style="font-family:Helvetica; text-transform:none; color:rgb(17,68,168);">${current_location['description']}</p><a href="${current_location['id']}.html"> Read more about the project </a></div>
                </section>`:'';

var tags = '';
for(var i = 0; i < current_location['tags'].length; i++){
	tags += `<li> ${current_location['tags'][i]} </li>`
}

response_data += `<section>
                            <h3>Project tags</h3>
                            <ul class="tags">${tags}</ul>
                    </section></div>
            <!--end right-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->`;



