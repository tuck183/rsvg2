var Complaint = require('../app/models/complaint');
var Executives = require('../app/models/executives');
var Judge = require('../app/models/judges');
var Legislators = require('../app/models/legislators');
var Media = require('../app/models/media');
var Ministry = require('../app/models/ministry');
var News = require('../app/models/news');
var Project = require('../app/models/project');
var State = require('../app/models/state');
var Storage = require('../app/models/storage');
var Voting_centres = require('../app/models/voting_centres');
var Phase = require('../app/models/phase');
var Benefit = require('../app/models/benefit');
var Department = require('../app/models/department');
var Director = require('../app/models/director');
var Agency = require('../app/models/agency');
var Before = require('../app/models/previous');
var Highlight = require('../app/models/highlight');
var Objective = require('../app/models/objective');
var NewsletterSubscriber = require('../app/models/subscriber');
var LGA = require('../app/models/lgas');
var Ruler = require('../app/models/ruler');

var crypto = require('crypto');
var formidable = require('formidable');
var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var request = require('request');

function Utils(){

	function get_ministries(return_function){
		Ministry.find({},function(err,ministries){
			if(err)
				throw err;
			return return_function(ministries);
		})
	}

	function get_ministry(details,return_function){
		Ministry.findOne({_id:details.id},function(err,ministry){
			if(err)
				throw err;
			return return_function(ministry);
		})
	}

	function add_ministry(details,return_function){
		var ministry = new Ministry();
		ministry.ministry = details.ministry;
		ministry.about = details.about;
		ministry.vision = details.vision;
		ministry.mission = details.mission;
		ministry.url = details.url;
		details.images.split(/,|;/).forEach(function(image){
			ministry.images.push(image.trim());
		});
		ministry.save(function(err,new_ministry){
			if(err)
				throw err;
			return return_function(new_ministry);
		})
	}

	function remove_ministry(details,return_function){
		Ministry.findOneAndRemove({_id:details.id},function(err,ministry){
			if(err)
				throw err;
			return return_function(ministry);
		})
	}

	function update_ministry(details,return_function){
		Ministry.findOne({_id:details.id},function(err,ministry){
			if(err)
				throw err;
			ministry.ministry = details.ministry;
			ministry.about = details.about;
			ministry.vision = details.vision;
			ministry.mission = details.mission;
			ministry.url = details.url;
			if(details.images){
				details.images.split(/,|;/).forEach(function(image,index){
					ministry.images[index] = image.trim();
				});
			}
			ministry.save(function(err,updated_ministry){
				if(err)
					throw err;
				return return_function(updated_ministry);
			})
		})
	}
	
	function get_complaint(details,return_function){
		Complaint.findOne({id:details.id},function(err,complaint){
			if(err)
				throw err;
			return return_function(complaint)
		})
	}

	function get_news(details,return_function){
		News.findOne({_id:details.id},function(err,news){
			if(err)
				throw err;
			return return_function(news);
		});
	}

	function get_all_news(return_function){
		News.find({},function(err,news){
			if(err)
				throw err;
			return return_function(news);
		})
	}

	function add_news(details,return_function){
		var news = new News();
		news.title = details.title;
		news.main_image = details.main_image;
		news.author = details.author;
		news.summary = details.summary;
		news.content = details.content;
		if(details.video_url.split(',').length > 0){
			details.video_url.split(',').forEach(function(video_url){
				news.video_url.push(video_url.trim())
			})
		}
		if(details.images_url.split(',').length > 0){
			details.images_url.split(',').forEach(function(image_url){
				news.images_url.push(image_url.trim())
			})
		}
		news.save(function(err,news_item){
			if(err)
				throw err;
			return return_function(news_item);
		})
	}

	function remove_news(details,return_function){
		News.findOneAndRemove({_id:details.id},function(err,deleted_news){
			if(err)
				throw err;
			return return_function(deleted_news);
		})
	}

	function update_news(details,return_function){
		News.findOne({_id:details.id},function(err,news){
			news.title = details.title;
			news.main_image = details.main_image;
			news.author = details.author;
			news.summary = details.summary;
			news.content = details.content;
			if(details.video_url.split(',').length > 0){
				details.video_url.split(',').forEach(function(video_url,index){
					news.video_url[index] = video_url.trim()
				})
			}
			if(details.images_url.split(',').length > 0){
				details.images_url.split(',').forEach(function(image_url,index){
					news.images_url[index] = image_url.trim()
				})
			}
			news.save(function(err,updated_news_item){
				if(err)
					throw err;
				return return_function(updated_news_item);
			})
		})
	}

	function get_judges(return_function){
		Judge.find({},function(err,judges){
			if(err)
				throw err;
			return return_function(judges);
		})
	}

	function get_judge(details,return_function){
		Judge.findOne({_id:details.id},function(err,judge){
			if(err)
				throw err;
			return return_function(judge);
		})
	}

	function update_judge(details,return_function){
		Judge.findOne({_id:details.id},function(err,judge){
			if(err)
				throw err;
			console.log('this is the judge',judge)
			judge.name = details.name;
			judge.position = details.position;
			judge.image = details.image.trim();
			judge.jurisdiction = details.jurisdiction;
			judge.court = details.court;
			judge.save(function(err,updated_judge){
				if(err)
					throw err;
				return return_function(updated_judge);
			})
		})
	}


	function remove_judge(details,return_function){
		Judge.findOneAndRemove({_id:details.id},function(err,deleted_judge){
			if(err)
				throw err;
			return return_function(deleted_judge);
		})
	}

	function add_judge(details,return_function){
		var judge = new Judge();
		judge.name = details.name;
		judge.position = details.position;
		judge.image = details.image.trim();
		judge.jurisdiction = details.jurisdiction;
		judge.court = details.court;
		judge.save(function(err,new_judge){
			if(err)
				throw err;
			return return_function(new_judge);
		})
	}

	function get_legislators(return_function){
		Legislators.find({},function(err,legislators){
			if(err)
				throw err;
			return return_function(legislators);
		})
	}

	function get_legislator(details,return_function){
		Legislators.findOne({_id:details.id},function(err,legislator){
			if(err)
				throw err;
			return return_function(legislator);
		})
	}

	function update_legislator(details,return_function){
		Legislators.findOne({_id:details.id},function(err,legislator){
			if(err)
				throw err;
			legislator.name = details.name;
			legislator.position = details.position;
			legislator.constituency = details.constituency;
			legislator.profile = details.profile;
			details.image.split(/,|;/).forEach(function(image,index){
				legislator.images[index] = image.trim();
			});
			legislator.save(function(err,updated_legislator){
				if(err)
					throw err;
				return return_function(updated_legislator);
			})
		})
	}

	function remove_legislator(details,return_function){
		Legislators.findOneAndRemove({_id:details.id},function(err,deleted_legislator){
			if(err)
				throw err;
			return return_function(deleted_legislator);
		})
	}

	function add_legislator(details,return_function){
		var new_legislator = new Legislators();
		new_legislator.name = details.name;
		new_legislator.position = details.position;
		new_legislator.constituency = details.constituency;
		new_legislator.profile = details.profile;
		details.image.split(/,|;/).forEach(function(image){
			new_legislator.images.push(image.trim());
		});
		new_legislator.save(function(err,legislator){
			if(err)
				throw err;
			return return_function(legislator);
		})
	}

	function get_executives(return_function){
		Executives.find({},function(err,executives){
			if(err)
				throw err;
			return return_function(executives);
		});
	}

	function get_executive(details,return_function){
		Executives.findOne({_id:details.id},function(err,executive){
			if(err)
				throw err;
			return return_function(executive);
		});
	}

	function update_executive(details,return_function){
		Executives.findOne({_id:details.id},function(err,executive){
			if(err)
				throw err;
			executive.name = details.name;
			executive.position = details.position;
			executive.profile = details.profile;
			if(details.ministry){
				executive.ministry = details.ministry;
			}
			details.image.split(/,|;/).forEach(function(image,index){
				executive.images[index] = image.trim();
			})
			executive.save(function(err,updated_exco){
				if(err)
					throw err;
				return return_function(updated_exco);
			})
		});
	}

	function remove_executive(details,return_function){
		Executives.findOneAndRemove({_id:details.id},function(err,deleted_executive){
			if(err)
				throw err;
			return return_function(deleted_executive);
		})
	}

	function add_executive(details,return_function){
		var new_executive = new Executives();
		new_executive.name = details.name;
		new_executive.position = details.position;
		new_executive.profile = details.profile;
		if(details.ministry){
			new_executive.ministry = details.ministry;
		}
		details.image.split(/,|;/).forEach(function(image){
			new_executive.images.push(image.trim());
		})
		new_executive.save(function(err,new_exco){
			if(err)
				throw err;
			return return_function(new_exco);
		})
	}

	

	function get_storage(details,return_function){
		Storage.findOne({storage_id:details.storage_id},function(err,stored_item){
			if(err)
				throw err;
			return return_function(stored_item);
		})
	}

	function get_projects(return_function){
		Project.find({},function(err,projects){
			if(err)
				throw err
			return return_function(projects);
		})
	}

	function get_project(details,return_function){
		Project.findOne({_id:details.id},function(err,project){
			if(err)
				throw err
			return return_function(project);
		})
	}

	function add_project(details,return_function){
		// convert the address to longitude and latitude
		request('https://maps.googleapis.com/maps/api/geocode/json?address='+details.location+'&key=AIzaSyAgcIBxOwvodgUpjE3v5mjZXJeQm77AtL4', function (error, response, body) {
			// let's parse the response body or else return a generic latlng;
			var latlng = JSON.parse(body)['results'].length?JSON.parse(body)['results'][0]['geometry']['location'] : {"lat" : 4.7938534,"lng" : 7.1574784}
			var project = new Project();
			project.ministry = details.ministry;
			project.title = details.title;
			project.category = details.category;
			project.location = details.location;
			project.description = details.description;
			project.gains = details.gains;
			project.longitude = latlng['lng'];
			project.latitude = latlng['lat'];
			project.projectId = details.lga;
			var tags = details.tags.split(/,|;/);
			tags.forEach(tag=>{
				return project.tags.push(tag.trim());
			});
			project.status = details.status;
			project.projectId = crypto.createHmac('sha256',details.title).update(details.ministry).digest('hex');
			project.save(function(err,new_project){
				if(err)
					throw err;
				console.log('this is the project details',new_project);
				return return_function(new_project);
			})
		});
		
	}

	function update_project(details,return_function){
		Project.findOne({_id:details.id},function(err,project){
			if(err)
				throw err;
			console.log(details);
			project.ministry = details.ministry;
			project.title = details.title;
			project.category = details.category;
			project.location = details.location;
			project.description = details.description;
			project.gains = details.gains;
			project.projectId = details.lga;
			var tags = details.tags.split(/,|;/);
			tags.forEach(function(tag,index){
				project.tags[index] = tag.trim();
			})
			console.log(project);
			project.status = details.status;
			project.save(function(err,updated_project){
				if(err)
					throw err;
				return return_function(updated_project);
			})
		})
	}

	function remove_project(details,return_function){
		Project.findOneAndRemove({_id:details.id},function(err,deleted_project){
			if(err)
				throw err;
			return return_function(deleted_project);
		})
	}

	function add_benefit(details,return_function){
		var benefit = new Benefit();
		benefit.projectId = details.project;
		benefit.title = details.title;
		benefit.description = details.description;
		benefit.save(function(err,new_benefit){
			if(err)
				throw err;
			return return_function(new_benefit);
		})
	}

	function get_benefits(return_function){
		Benefit.find({},function(err,benefits){
			if(err)
				throw err;
			return return_function(benefits);
		})
	}

	function get_benefit(details,return_function){
		Benefit.findOne({_id:details.id},function(err,benefit){
			if(err)
				throw err;
			return return_function(benefit);
		})
	}

	function get_project_benefits(details,return_function){
		Benefit.find({projectId:details.id},function(err,benefits){
			if(err)
				throw err;
			return return_function(benefits);
		})
	}

	function remove_benefit(details,return_function){
		Benefit.findOneAndRemove({_id:details.id},function(err,deleted_benefit){
			if(err)
				throw err;
			return return_function(deleted_benefit);
		})
	}

	function update_benefit(details,return_function){
		Benefit.findOne({_id:details.id},function(err,benefit){
			if(err)
				throw err;
			benefit.projectId = details.project;
			benefit.title = details.title;
			benefit.description = details.description;
			benefit.save(function(err,updated_benefit){
				if(err)
					throw err;
				return return_function(updated_benefit);
			})
		})
	}

	function add_phase(details,return_function){
		var phase = new Phase();
		phase.projectId = details.project;
		phase.phase = details.phase;
		phase.description = details.description;
		var image_urls = details.images.split(/,|;/);
		image_urls.forEach(image_url => {
			return phase.images.push(image_url.trim());
		})
		phase.save(function(err,new_phase){
			if(err)
				throw err;
			return return_function(new_phase);
		})
	}

	function get_phases(return_function){
		Phase.find({},function(err,phases){
			if(err)
				throw err;
			return return_function(phases);
		})
	}

	function get_phase(details, return_function){
		Phase.findOne({_id:details.id},function(err,phase){
			if(err)
				throw err;
			return return_function(phase);
		})
	}

	function get_project_phases(details,return_function){
		Phase.find({projectId:details.id},function(err,project_phases){
			if(err)
				throw err;
			console.log(project_phases);
			return return_function(project_phases);
		})
	}

	function remove_phase(details,return_function){
		Phase.findOneAndRemove({_id:details.id},function(err,deleted_phase){
			if(err)
				throw err;
			return return_function(deleted_phase);
		})
	}

	function update_phase(details,return_function){
		Phase.findOne({_id:details.id},function(err,phase){
			phase.projectId = details.project;
			phase.phase = details.phase;
			phase.description = details.description;
			var image_urls = details.images.split(/,|;/);
			image_urls.forEach((image_url,index) => {
				 phase.images[index] = image_url.trim();
			})
			phase.save(function(err,updated_phase){
				if(err)
					throw err;
				return return_function(updated_phase);
			})
		})
	}

	function add_department(details,return_function){
		var department = new Department()
		department.name = details.name;
		department.ministryId = details.ministry;
		department.save(function(err, new_department){
			if(err)
				throw err;
			return return_function(new_department);
		})
	}

	function get_departments(return_function){
		Department.find({},function(err,departments){
			if(err)
				throw err;
			return return_function(departments);
		})
	}

	function get_department(details,return_function){
		Department.findOne({_id:details.id},function(err,department){
			if(err)
				throw err;
			return return_function(department);
		})
	}

	function get_ministry_departments(details,return_function){
		Department.find({ministryId:details.id},function(err,departments){
			if(err)
				throw err;
			return return_function(departments);
		})
	}

	function remove_department(details,return_function){
		Department.findOneAndRemove({_id:details.id},function(err,deleted_department){
			if(err)
				throw err;
			return return_function(deleted_department);
		})
	}

	function update_department(details,return_function){
		Department.findOne({_id:details.id},function(err,department){
			department.name = details.name;
			department.ministryId = details.ministry;
			department.save(function(err, updated_department){
				if(err)
					throw err;
				return return_function(updated_department);
			})
		})
	}

	function add_agency(details,return_function){
		var agency = new Agency();
		agency.name = details.name;
		agency.ministryId = details.ministry;
		agency.save(function(err,new_agency){
			if(err)
				throw err;
			return return_function(new_agency);
		});
	}

	function get_agencies(return_function){
		Agency.find({},function(err,agencies){
			if(err)
				throw err;
			return return_function(agencies);
		})
	}

	function get_agency(details,return_function){
		Agency.findOne({_id:details.id},function(err,agency){
			if(err)
				throw err;
			return return_function(agency);
		})
	}

	function get_ministry_agencies(details,return_function){
		Agency.find({ministryId:details.id},function(err,agencies){
			if(err)
				throw err;
			return return_function(agencies);
		})
	}

	function remove_agency(details,return_function){
		Agency.findOneAndRemove({_id:details.id},function(err,deleted_agency){
			if(err)
				throw err;
			return return_function(deleted_agency);
		})
	}

	function update_agency(details,return_function){
		Agency.findOne({_id:details.id},function(err,agency){
			agency.name = details.name;
			agency.ministryId = details.ministry;
			agency.save(function(err,updated_agency){
				if(err)
					throw err;
				return return_function(updated_agency);
			});
		})
	}

	function add_director(details,return_function){
		var director = new Director();
		director.name = details.name;
		director.ministryId = details.ministry;
		director.image_url = details.image;
		director.designation = details.position;
		director.save(function(err,new_director){
			if(err)
				throw err;
			return return_function(new_director);
		})
	}

	function get_director(details,return_function){
		Director.findOne({_id:details.id},function(err,director){
			if(err)
				throw err;
			return return_function(director);
		})
	}

	function get_directors(return_function){
		Director.find({},function(err,directors){
			if(err)
				throw err;
			return return_function(directors);
		})
	}

	function get_ministry_directors(details,return_function){
		Director.find({ministryId:details.id},function(err,directors){
			if(err)
				throw err;
			return return_function(directors);
		})
	}

	function remove_director(details,return_function){
		Director.findOneAndRemove({_id:details.id},function(err,deleted_director){
			if(err)
				throw err;
			return return_function(deleted_director);
		})
	}

	function update_director(details,return_function){
		Director.findOne({_id:details.id},function(err,director){
			director.name = details.name;
			director.ministryId = details.ministry;
			director.image_url = details.image;
			director.designation = details.position;
			director.save(function(err,updated_director){
				if(err)
					throw err;
				return return_function(updated_director);
			})
		})
	}

	function add_before(details,return_function){
		var before = new Before();
		before.projectId = details.project;
		before.name = details.name;
		details.images.split(/,|;/).forEach(function(image){
			before.images_url.push(image.trim());
		})
		before.save(function(err,new_before){
			if(err)
				throw err;
			return return_function(new_before);
		})
	}

	function get_before(details,return_function){
		Before.findOne({_id:details.id},function(err,before){
			if(err)
				throw err;
			return return_function(before);
		})
	}

	function get_befores(return_function){
		Before.find({},function(err,befores){
			if(err)
				throw err;
			return return_function(befores);
		})
	}

	function get_project_befores(details,return_function){
		Before.find({projectId:details.id},function(err,projects){
			if(err)
				throw err;
			return return_function(projects)
		})
	}

	function update_before(details,return_function){
		Before.findOne({_id:details.id},function(err,before){
			before.projectId = details.project;
			before.name = details.name;
			details.images.split(/,|;/).forEach(function(image,index){
				before.images_url[index] = image.trim();
			})
			before.save(function(err,updated_before){
				if(err)
					throw err;
				return return_function(updated_before);
			})
		})
	}

	function remove_before(details,return_function){
		Before.findOneAndRemove({_id:details.id},function(err,deleted_before){
			if(err)
				throw err;
			return return_function(deleted_before);
		})
	}


	function get_state(return_function){
		State.findOne({},function(err,state){
			if(err)
				throw err;
			return return_function(state);
		})
	}
	
	function get_voting_centre(details,return_function){
		Voting_centres.findOne({_id:details.id},function(err,voting_centre){
			if(err)
				throw err;
			return return_function(voting_centre);
		})
	}

	function get_voting_centres(return_function){
		Voting_centres.find({},function(err,voting_centres){
			if(err)
				throw err;
			return return_function(voting_centres);
		})
	}

	function add_voting_centre(details,return_function){
		request('https://maps.googleapis.com/maps/api/geocode/json?address='+details.address+'&key=AIzaSyAgcIBxOwvodgUpjE3v5mjZXJeQm77AtL4', function (error, response, body) {
			// let's parse the response body or else return a generic latlng;
			console.log(body);
			var latlng = JSON.parse(body)['results'].length?JSON.parse(body)['results'][0]['geometry']['location'] : {"lat" : 4.7938534,"lng" : 7.1574784}
			var voting_centre = new Voting_centres();
			voting_centre.address = details.address;
			voting_centre.longitude = latlng['lng'];
			voting_centre.latitude = latlng['lat'];
			voting_centre.lga = details.lga;
			voting_centre.ward = details.ward;
			voting_centre.description = details.description;
			details.images.split(/,|;/).forEach(function(image){
				voting_centre.images.push(image.trim());
			});
			voting_centre.save(function(err,new_centre){
				if(err)
					throw err;
				return return_function(new_centre);
			})
		});
	}

	function remove_voting_centre(details,return_function){
		Voting_centres.findOneAndRemove({_id:details.id},function(err,voting_centre){
			if(err)
				throw err;
			return return_function(voting_centre);
		})
	}

	function update_voting_centre(details,return_function){
		Voting_centres.findOne({_id:details.id},function(err,voting_centre){
			voting_centre.address = details.address;
			voting_centre.longitude = details.longitude;
			voting_centre.latitude = details.latitude;
			voting_centre.lga = details.lga;
			voting_centre.ward = details.ward;
			voting_centre.description = details.description;
			details.images.split(/,|;/).forEach(function(image,index){
				voting_centre.images[index] = image.trim();
			});
			voting_centre.markModified('images');
			voting_centre.save(function(err,updated_centre){
				if(err)
					throw err;
				return return_function(updated_centre);
			})
		})
	}

	function add_media(req, return_function){
		var form = new formidable.IncomingForm();
		form.maxFileSize = 50000 * 1024 * 1024;
		form.parse(req,function(err,fields,files){
			if(err)
				throw err;
			var media_buffer = fs.readFileSync(files.file.path);
			var fileParts = files.file.name.split('.');
			var fileExtension = fileParts[fileParts.length - 1];
			var awsFileName = files.file.path.split('_')[1]+"_"+String(Date.now())+'.'+fileExtension.toLowerCase();
		
			// folder names can be any of documents, images, videos
			var awsBucketName = 'phrivers/'+fields.type;
			var s3 = new AWS.S3({
				accessKeyId:process.env.awsAccessKey || 'AKIAIPA6KS5SLVBVTXFQ',
				secretAccessKey:process.env.awsSecretAccessKey || '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'
			});
			
			console.log('the file name',awsFileName);
			var params = {Bucket: awsBucketName, ACL:'public-read', Key: awsFileName, Body:media_buffer };
			s3.putObject(params, function(err, data) {
				if (err)
				  throw err;
				else{ // save the media document details after successful uploading of video to amazon S3
				 	var media = new Media();
				 	media.url = awsFileName;
				 	media.tag = fields.tag;
				 	if(fields.category == 'video'){
				 		media.poster = fields.poster;
				 	}
				 	media.type = fields.type;
				 	media.category = fields.category;
				 	media.title = fields.title;
				 	media.save(function(err,new_media){
				 		if(err)
				 			throw err;
				 		return return_function(media);
				 	})
				}
			});
		})
	}

	function remove_media(details,return_function){
		Media.findOneAndRemove({_id:details.id},function(err,deleted_media){
			if(err)
				throw err;
			return return_function(deleted_media);
		})
	}

	function get_media(return_function){
		Media.find({},function(err,media){
			if(err)
				throw err;
			return return_function(media);
		})
	}

	function sort_media(media_type,return_function){
		Media.find({},function(err,media){
			if(err)
				throw err;
			var documents = media.filter(function(media_item){
			if(media_item.type == media_type){
					return media_item;
				}
			});
			var documents_categories = {};
			documents.forEach(function(document){
				if(documents_categories[document.category]){
					documents_categories[document.category].push(document);
				}
				else{
					documents_categories[document.category] = [];
					documents_categories[document.category].push(document);
				}
			});
			return return_function(documents_categories);
		})
		
	}

	function get_ministry_exco(details,return_function){
		Executives.findOne({ministry:details.id},function(err,exco){
			if(err)
				throw err;
			return return_function(exco);
		})
	}

	function add_highlight(details,return_function){
		var highlight = new Highlight();
		highlight.ministryId = details.ministry;
		highlight.title = details.title;
		highlight.description = details.description;
		highlight.video_url = details.video;
		highlight.video_poster = details.poster;
		highlight.save(function(err, new_highlight){
			if(err)
				throw err;
			return return_function(new_highlight);
		})
	}

	function get_highlights(return_function){
		Highlight.find({},function(err,highlights){
			if(err)
				throw err;
			return return_function(highlights);
		})
	}

	function get_highlight(details,return_function){
		Highlight.findOne({_id:details.id},function(err,highlight){
			if(err)
				throw err;
			return return_function(highlight);
		})
	}

	function remove_highlight(details,return_function){
		Highlight.findOneAndRemove({_id:details.id},function(err, removed_highlight){
			if(err)
				throw err;
			return return_function(removed_highlight);
		})
	}

	function update_highlight(details,return_function){
		Highlight.findOne({_id:details.id},function(err,highlight){
			highlight.ministryId = details.ministry;
			highlight.title = details.title;
			highlight.description = details.description;
			highlight.video_url = details.video;
			highlight.video_poster = details.poster;
			highlight.save(function(err, updated_highlight){
				if(err)
					throw err;
				return return_function(updated_highlight);
			})
		})
	}

	function add_objective(details,return_function){
		var objective = new Objective();
		objective.ministryId = details.ministry;
		objective.objective = details.objective;
		objective.description = details.description;
		objective.save(function(err,new_objective){
			if(err)
				throw err;
			return return_function(new_objective);
		})
	}

	function get_objectives(return_function){
		Objective.find({},function(err,objectives){
			if(err)
				throw err;
			return return_function(objectives);
		})
	}

	function get_objective(details,return_function){
		Objective.findOne({_id:details.id},function(err,objective){
			if(err)
				throw err;
			return return_function(objective);
		})
	}

	function remove_objective(details,return_function){
		Objective.findOneAndRemove({_id:details.id},function(err,removed_objective){
			if(err)
				throw err;
			return return_function(removed_objective);
		})
	}

	function update_objective(details,return_function){
		Objective.findOne({_id:details.id},function(err,objective){
			objective.ministryId = details.ministry;
			objective.objective = details.objective;
			objective.description = details.description;
			objective.save(function(err,updated_objective){
				if(err)
					throw err;
				return return_function(updated_objective);
			})
		})
	}

	function get_ministry_objectives(details,return_function){
		Objective.find({ministryId:details.id},function(err,objectives){
			if(err)
				throw err;
			return return_function(objectives);
		})
	}

	function add_subscriber(details,return_function){
		var subscriber = new NewsletterSubscriber();
		subscriber.email = details.email;
		subscriber.save(function(err,new_subscriber){
			if(err)
				throw err;
			return return_function(new_subscriber);
		})
	}

	function add_lga(details,return_function){
		var lga = new LGA();
		lga.name = details.name;
		lga.description = details.description;
		lga.save(function(err,new_lga){
			if(err)
				throw err;
			return return_function(new_lga);
		})
	}

	function get_lga(details,return_function){
		LGA.findOne({_id:details.id},function(err,lga){
			if(err)
				throw err;
			return return_function(lga);
		})
	}

	function get_lgas(return_function){
		LGA.find({},function(err,lgas){
			if(err)
				throw err;
			return return_function(lgas);
		})
	};

	function update_lga(details,return_function){
		LGA.findOne({_id:details.id},function(err,lga){
			if(err)
				throw err;
			lga.name = details.name;
			lga.description = details.description;
			lga.save(function(err,updated_lga){
				if(err)
					throw err;
				return return_function(updated_lga);
			})
		})
	}

	function remove_lga(details,return_function){
		LGA.findOneAndRemove({_id:details.id},function(err,lga){
			if(err)
				throw err;
			return return_function(lga);
		})
	}

	function add_complaint(details,return_function){
		var complaint = new Complaint();
		complaint.name = details.name;
		complaint.email = details.email;
		complaint.phone = details.phone;
		complaint.location = details.location;
		complaint.complaint = details.complaint;
		complaint.save(function(err,new_complaint){
			if(err)
				throw err;
			return return_function(new_complaint);
		})
	}

	function get_complaints(return_function){
		Complaint.find({},function(err,complaints){
			if(err)
				throw err;
			return return_function(complaints);
		})
	}

	function add_ruler(details,return_function){
		var ruler = new Ruler();
		ruler.name = details.name;
		ruler.title = details.title;
		ruler.kingdom = details.kingdom;
		ruler.image_url = details.image_url;
		ruler.save(function(err,new_ruler){
			if(err)
				throw err;
			return return_function(new_ruler);
		})
	}

	function get_ruler(details,return_function){
		Ruler.findOne({_id:details.id},function(err,ruler){
			if(err)
				throw err;
			return return_function(ruler);
		})
	}

	function get_rulers(return_function){
		Ruler.find({},function(err,rulers){
			if(err)
				throw err;
			return return_function(rulers);
		});
	}

	function update_ruler(details,return_function){
		Ruler.findOne({_id:details.id},function(err,ruler){
			ruler.name = details.name;
			ruler.title = details.title;
			ruler.kingdom = details.kingdom;
			ruler.image_url = details.image_url;
			ruler.save(function(err,new_ruler){
				if(err)
					throw err;
				return return_function(new_ruler);
			})
		})
	}

	function remove_ruler(details,return_function){
		Ruler.findOneAndRemove({_id:details.id},function(err,ruler){
			if(err)
				throw err;
			return return_function(ruler);
		})
	}

	return {
		get_ministry:get_ministry,
		get_complaint:get_complaint,
		get_news:get_news,
		get_judges:get_judges,
		get_legislators:get_legislators,
		get_executives:get_executives,
		get_project:get_project,
		get_projects: get_projects,
		get_state:get_state,
		get_voting_centres:get_voting_centres,
		get_voting_centre:get_voting_centre,
		add_project:add_project,
		add_phase:add_phase,
		add_benefit:add_benefit,
		add_judge: add_judge,
		add_executive: add_executive,
		add_legislator: add_legislator,
		get_judge: get_judge,
		get_executive: get_executive,
		get_legislator: get_legislator,
		remove_legislator: remove_legislator,
		remove_executive: remove_executive,
		remove_judge: remove_judge,
		update_executive: update_executive,
		update_legislator: update_legislator,
		update_judge: update_judge,
		add_voting_centre: add_voting_centre,
		remove_voting_centre: remove_voting_centre,
		update_voting_centre: update_voting_centre,
		add_ministry: add_ministry,
		update_ministry: update_ministry,
		remove_ministry: remove_ministry,
		get_ministries: get_ministries,
		update_project: update_project,
		remove_project: remove_project,
		update_project: update_project,
		update_benefit: update_benefit,
		update_director: update_director,
		update_news: update_news,
		update_agency: update_agency,
		update_phase: update_phase,
		update_department: update_department,
		update_before: update_before,
		remove_benefit: remove_benefit,
		remove_news: remove_news,
		remove_agency: remove_agency,
		remove_phase: remove_phase,
		remove_department: remove_department,
		remove_director: remove_director,
		remove_before: remove_before,
		get_all_news: get_all_news,
		get_benefits: get_benefits,
		get_phases: get_phases,
		get_departments: get_departments,
		get_agency: get_agency,
		get_directors: get_directors,
		get_befores: get_befores,
		get_before: get_before,
		get_project_befores: get_project_befores,
		get_project_phases: get_project_phases,
		get_project_benefits: get_project_benefits,
		get_ministry_directors: get_ministry_directors,
		get_ministry_agencies: get_ministry_agencies,
		get_ministry_departments: get_ministry_departments,
		get_phase: get_phase,
		get_benefit: get_benefit,
		get_director: get_director,
		get_department: get_department,
		get_agencies: get_agencies,
		get_news: get_news,
		add_benefit: add_benefit,
		add_news: add_news,
		add_phase: add_phase,
		add_department: add_department,
		add_agency: add_agency,
		add_director: add_director,
		add_before: add_before,
		add_media: add_media,
		remove_media: remove_media,
		get_media: get_media,
		sort_media: sort_media,
		get_ministry_exco: get_ministry_exco,
		update_highlight: update_highlight,
		remove_highlight: remove_highlight,
		add_highlight: add_highlight,
		get_highlights: get_highlights,
		get_highlight: get_highlight,
		add_objective: add_objective,
		remove_objective: remove_objective,
		update_objective: update_objective,
		get_objective: get_objective,
		get_objectives: get_objectives,
		get_ministry_objectives: get_ministry_objectives,
		add_subscriber: add_subscriber,
		add_lga: add_lga,
		get_lga: get_lga,
		get_lgas: get_lgas,
		remove_lga: remove_lga,
		update_lga: update_lga,
		add_complaint: add_complaint,
		get_complaints: get_complaints,
		add_ruler: add_ruler,
		get_rulers: get_rulers,
		get_ruler: get_ruler,
		update_ruler: update_ruler,
		remove_ruler: remove_ruler,
	};
}

module.exports = Utils();