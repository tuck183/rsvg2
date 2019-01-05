
var express = require('express');
var router = express.Router();
var Utils = require('../config/utils.js');
var Algorithms = require('../config/algorithms.js');


function route(app,passport,mongoose){
	
	//===== static pages ==== 

	router.get('/',function(req,res){
		// get 2 latest news items
		// latest media items
		// random set of projects
		// all voting centres
		Utils.get_all_news(function(all_news){
			var data = {}
			var latest_news = all_news.slice(all_news.length-2,all_news.length);
			data['news'] = latest_news;
			Utils.get_voting_centres(function(voting_centres){
				/*
				description: 'Hospitable people',
				  ward: 'Isiokpo',
				  lga: 'Isiokpo',
				  latitude: '40.8737089',
				  longitude: '-73.8557493',
				  address: 'Eliozu, Obio Akpor, Rivers State',
				  __v: 0,
				  images: [ 'ajfda.ajdf', 'djakf.fdja' ] 
				*/
				var mapped_voting_centres = voting_centres.map(function(voting_centre){
					return {
						'ward':voting_centre.ward,
						'lga':voting_centre.lga,
						'latitude':voting_centre.latitude,
						'longitude':voting_centre.longitude,
						'address':voting_centre.address,
						'images':voting_centre.images,
						'id':`${voting_centre._id}`,
						'description':voting_centre.description,
					}
				})
				data['voting_centres'] = JSON.stringify(mapped_voting_centres);
				data['projects'] = [];
				Utils.get_projects(function(projects){
					var counter = projects.length > 6?6:projects.length;
					var projects_holder = new Array(counter);
					for(var i = 0; i < projects_holder.length; i++){
						var rand_project = projects[Math.floor(Math.random() * projects.length)];
						projects_holder[i] = rand_project;
					}
					Utils.get_phases(function(phases){
						for(var u = 0; u < projects_holder.length; u++){
							var holder = {project:projects_holder[u],phases:[]}
							for(var i = 0; i < phases.length; i++){
								if(projects_holder[u]['_id'] == phases[i]['projectId']){
									holder['phases'].push(phases[i]);
								}
							}
							data['projects'].push(holder);
						}
						console.log(data);
						res.render('index',data);
					})
				})
			})
		})
	})

	router.post('/newsletter',function(req,res){
		Utils.add_subscriber(req.body,function(new_subscriber){
			console.log(new_subscriber);
			res.json({"message":"You've successfully registered for the state's newsletter..."})
		})
	})

	router.get('/ministry',function(req,res){
		// endeavor to include ministries highlights
		// get commissioner in charge of ministry
		// get top 4 directors for ministry
		if(req.query.id){
			Utils.get_ministry({id:req.query.id},function(ministry){
				var requested_ministry = {}
				requested_ministry['ministry'] = ministry;
				Utils.get_ministry_agencies({id:req.query.id},function(agencies){
					requested_ministry['agencies'] = agencies;
					Utils.get_ministry_departments({id:req.query.id},function(departments){
						requested_ministry['departments'] = departments;
						Utils.get_ministry_directors({id:req.query.id},function(directors){
							requested_ministry['directors'] = directors;
							Utils.get_ministry_exco({id:req.query.id},function(commissioner){
								requested_ministry['commissioner'] = commissioner;
								Utils.get_ministry_objectives({id:ministry._id},function(objectives){
									requested_ministry['objectives'] = objectives;
									console.log(requested_ministry);
									res.render('ministry',requested_ministry);
								})
							})
						})
					})
				})
			})
		}
		else{
			Utils.get_ministries(function(ministries){
				var ministries_data = {'ministries':ministries};
				Utils.get_agencies(function(agencies){
					ministries_data['agencies'] = agencies;
					Utils.get_departments(function(departments){
						ministries_data['departments'] = departments;
						console.log(ministries_data);
						res.render('mdas',ministries_data);
					});
				});
				
			})
		}
	})
	
	router.get('/executive',function(req,res){
		if(req.query.id){
			Utils.get_executive({id:req.query.id},function(executive){
				console.log(executive);
				res.send(executive);
			})
		}
		else{
			Utils.get_executives(function(executives){
				var execs = {"Commissioner":[]}
				executives.forEach(function(exco){
					if(exco.position != "Commissioner"){
						execs[exco.position] = exco;
					}
					else{
						execs["Commissioner"].push(exco);
					}
				})
				Utils.get_ministries(function(ministries){
					var mapped_ministries = ministries.map(function(ministry){
						return {ministry:ministry.ministry, id:ministry._id}
					})
					console.log(execs);
					console.log('ministries are',mapped_ministries);
					res.render('executive',{executives:execs, ministries:mapped_ministries});
				})
			})
		}
		
	});

	router.get('/judiciary',function(req,res){
		Utils.get_judges(function(judges){
			var judiciary = {'Chief Judge':{}, 'High Court':[], 'Court of Appeal':[]};
			judges.forEach(function(judge){
				if(judge.position != 'None'){
					judiciary['Chief'] = judge;
				}
				else{
					if(judge.court == 'High Court'){
						judiciary['High Court'].push(judge);
					}
					else{
						judiciary['Court of Appeal'].push(judge);
					}
				}
			})
			console.log(judiciary);
			res.render('judiciary',{judiciary:judiciary});
		})
	});

	router.get('/legislature',function(req,res){
		if(req.query.id){
			Utils.get_legislator({id:req.query.id},function(legislator){
				console.log(legislator);
				res.send(legislator);
			})
		}
		else{
			Utils.get_legislators(function(legislators){
				var legislature = {'members':[]};
				legislators.forEach(function(legislator){
					if(legislator.position !== 'none'){
						legislature[legislator.position] = legislator
					}
					else{
						legislature['members'].push(legislator);
					}
				});

				console.log(legislature);
				res.render('legislature',{legislators:legislature});
			})
		}
	});

	router.get('/project',function(req,res){
		if(req.query.id){
			Utils.get_project({id:req.query.id},function(project){
				var project_details = {'project':project}
				Utils.get_project_phases({id:req.query.id},function(phases){
					project_details['phases'] = phases;
					Utils.get_project_benefits({id:req.query.id},function(benefits){
						project_details['benefits'] = benefits;
						Utils.get_project_befores({id:req.query.id},function(befores){
							project_details['befores'] = befores;
							console.log(project_details);
							res.render('project',project_details);
						})
					})
				})
			})
		}
		else{
			res.render('projects.ejs');
		}
	})

	router.post('/project',function(req,res){
		Utils.get_projects(function(projects){
			// we just need the basic details of a project here
		    projects.forEach(function(project){
				project.id = project._id;
			})
		    console.log(projects);
			res.json(JSON.stringify(projects));
		})
	});

	router.post('/modal',function(req,res){
		console.log(req.body);
		Utils.get_project({id:req.body.id},function(project){
			Utils.get_project_phases({id:req.query.id},function(phases){
				console.log(project);
				var response_data = `<div  class="modal-item-detail modal-dialog" role="document" data-latitude="${project.latitude}" data-longitude="${project.longitude}" data-address="${project.location}">
							    		<div class="modal-content" style="background:white">
							        		<div class="modal-header">
								            	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								            	<div class="section-title">
								                	<h2>${project['title']} </h2>
								                <div class="label label-default">${project['category']}</div>
								            </div>
							        </div>

		        					<div class="modal-body">
		            					<div class="left">`;
				var gallery = '';
				var galleryIndicators = '<ol class="carousel-indicators">';
                            	
                       
                if(phases[0]){
                	phases[0].images.forEach(function(image,index){
						if(index == 0){
							galleryIndicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="active"></li`
							gallery += `<div class="item active"><img style="margin-left:20px;" src="${image}" alt=""></div>`
						}
						else{
							galleryIndicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${index}"></li>`;
							gallery += `<div class="item"><img style="margin-left:20px;" src="${image}" alt=""></div>`
						}
						
					})
                }     	
				
				galleryIndicators +='</ol>';
				response_data += `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
						<div class="carousel-inner">${gallery}${galleryIndicators} </div></div><div class="map" id="map-modal"></div>`;
				response_data += `</section>
		                <section>
		                    <h3>Social Share</h3>
		                    <div class="social-share"></div>
		                </section>
		            </div>
		            <!--end left -->
		            <div class="right">
		                <section>
		                	<h3 style="font-family:Poppins">Location of Project</h3>
                    <div><p style="font-family:Karla; font-weight:700; margin-bottom:20px;  line-height:1; text-transform:none; color:rgb(17,68,168);">${project['location']}</p></div>
		                    <h3>About</h3>
		                    <div class=""><p style="font-family:Helvetica; text-transform:none; color:rgb(17,68,168);">${project['description']}</p><a href="/project?id=${project['id']}"> Read more about the project </a></div>
		                </section>`;
		        var tags = '';
				for(var i = 0; i < project['tags'].length; i++){
					tags += `<li> ${project['tags'][i]} </li>`
				}
				response_data += `  <section>
			                            <h3>Project tags</h3>
			                            <ul class="tags">${tags}</ul>
				                    </section>
				                   
				            	</div>
						</div>`
				res.send(response_data);
			})
		})

	})

	router.post('/sidebar',function(req,res){
		
		Utils.get_projects(function(projects){
			console.log(req.body);
			var markers = req.body.markers;
			var response_data;
			for(var i = 0; i < projects.length; i++ ){
				for(var e = 0; e < markers.length; e++ ){
					if(projects[i]['_id'] == markers[e]){
						response_data = `div class="result-item" data-id="${projects[i]['_id']}">`;
						response_data += `<a href="/project?id=${projects[i]['_id']}">`;
						response_data += `<h3> ${projects[i]['title']}`;
						response_data += `<div class="result-item-detail">`;
						response_data += `<div class="description"><h5><i class="fa fa-map-marker"></i>${projects[i]['location']}</h5>`;
						response_data += `</div>
		                        </div>
		                    </a>
		                </div>`
					}
					
				}
			}

			res.send(response_data);
		})
	});

	router.get('/news',function(req,res){
		if(req.query.id){
			Utils.get_news({id:req.query.id},function(news_item){
				console.log(news_item);
				res.render('news',news_item);
			});
		}
		else{
			Utils.get_all_news(function(all_news){
				Utils.get_media(function(all_media){
					var information_media = all_media.filter(function(media_item){
						if(media_item.category == 'information')
							return true;
					})
					console.log('information media',information_media);
					console.log('all news',all_news);
					res.render('media',{news:all_news});
				})
			})
		}
	})

	router.post('/news',function(req,res){
		console.log(req.body);
		function get_dates(date){
			var details = {};
			details['year'] = date.getFullYear();
			details['month'] = date.getMonth();
			details['day'] = date.getDate();
			return details;
		}

		function form_time(year,month,day){
			return (new Date(year,month,day)).getTime();
		}

		Utils.get_all_news(function(all_news){
			if(req.body.date){
				// specified dates is the variable container of news items successfully filtered by date
				var specified_dates = all_news.filter(function(news){
					var parsed_news_date = get_dates(news.date_published);
					var search_date = req.body.date.split(/\/|\-/);
					var news_time = form_time(parsed_news_date['year'],parsed_news_date['month'],parsed_news_date['day']);
					var search_time = form_time(Number(search_date[2]),Number(search_date[1])-1,Number(search_date[0]));
					if(news_time == search_time){
						return {news:news};
					}
				})
			}
			if(req.body.title){
				if(req.body.date){
					var specified_titles = specified_dates.map(function(news){
						return {score: Algorithms.cosine_distance(req.body.title.toLowerCase(),news.title.toLowerCase()), news:news};
					})
					specified_titles.sort(Algorithms.sorter)
				}
				else{
					var specified_titles = all_news.map(function(news){
						return {score: Algorithms.cosine_distance(req.body.title.toLowerCase(),news.title.toLowerCase()), news:news, };
					})
					specified_titles.sort(Algorithms.sorter);
				}
			}
			if(req.body.author){
				if(req.body.date){
					var specified_authors = specified_dates.map(function(news){
						return {score: Algorithms.cosine_distance(req.body.author.toLowerCase(),news.author.toLowerCase()), news:news};
					})
					specified_authors.sort(Algorithms.sorter);
				}
				if(req.body.title){
					var specified_authors = specified_titles.map(function(news){
						console.log(news);
						return {score: Algorithms.cosine_distance(req.body.author.toLowerCase(),news.news.author.toLowerCase()),  news:news.news};
					})
					specified_authors.sort(Algorithms.sorter)
				}
				else{
					var specified_authors = all_news.map(function(news){
						return {score: Algorithms.cosine_distance(req.body.author.toLowerCase(),news.author.toLowerCase()), news:news};
					})
					specified_authors.sort(Algorithms.sorter);
				}
			}
			var response = specified_authors && specified_authors.length? specified_authors : specified_titles && specified_titles.length? specified_titles: specified_dates && specified_dates.length?specified_dates:[];
			var response_data = response.map(function(data){
				if(Object.keys(data).length > 1){
					console.log(data.news);
					return data.news
				}
				else{
					return data;
				}
			})
			console.log(response);
			res.send(response_data);
		})
	})

	router.get('/state',function(req,res){
		res.render('state.ejs');
	})


	router.post('/complaint',function(req,res){
		Utils.add_complaint(req.body,function(complaint){
			console.log(complaint);
			res.send({"message":"You've successfully added a complaint. We are on it"})
		})
	})
	
	return router;
}
module.exports = route;
