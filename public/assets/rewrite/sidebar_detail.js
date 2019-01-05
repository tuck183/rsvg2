var current_location = "";

var projects = [];

for(var i = 0; i < projects.length; i++){
	if(projects[i]['id'] == req.body.id){
		current_location = projects[i];
		break;
	}
}

var response_data = 
`<div class="sidebar-content" data-id="${current_location['id']}">
    <div class="back"></div>
    <!--end back-button-->

    <div class="controls-more">
        <ul>
            <li><a href="#">Add to favorites</a></li>
            <li><a href="#">Add to watchlist</a></li>
        </ul>
    </div>
    <!--end controls-more-->

    <div class="section-title">
        <a href=" ${current_location['url']} " class="btn btn-primary btn-framed btn-rounded btn-xs full-detail">Full Detail</a>'`
response_data += current_location['title']? `<h2> ${current_location['title']} </h2>`:'';
response_data += current_location['location'] ? `<h4> ${current_location['location']} </h4>`:'';
response_data += current_location['category'] ? `<div class="label label-default"> ${current_location['category']}</div>`:'';
response_data += current_location['ribbon'] ? `<figure class="ribbon"> ${current_location['ribbon']} </figure>`:'';
response_data += current_location['rating'] ? `<div class="rating-passive" data-rating=" ${current_location['rating']}"><span class="stars"></span><span class="reviews"> ${current_location['reviews_number']}</span></div></div>`:'';

var gallery = "";
for(var i = 0; i < current_location['gallery'].length; i++){
	gallery +=`<img src="${current_location['gallery'][i]} " alt ="gallery image of projects" /> `
}

response_data += current_location['gallery'] ? `<div class="gallery-wrapper"><div class="gallery owl-carousel" data-owl-nav="0" data-owl-dots="1">${gallery}</div></div>`:`<div class="image" style="background-image: url(assets/img/items/default.png); height: 290px;"></div>`;
response_data += current_location['description'] ? `<section><h3>About</h3><div class="read-more"><p> ${currentLocation['description']} </p></div></section>`:'';

var tags = "";
for(var i = 0; i < current_location['tags']; i++){
	tags += `<li> ${current_location['tags'][i]} </li>`;
}
response_data += current_location['tags']? `<section><h3>Features</h3><ul class="tags">${tags}</ul></section>`:'';

