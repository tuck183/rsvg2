
var formidable = require('formidable');
var AWS = require('aws-sdk');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto')
var express = require('express');
var Utils = require('../config/utils');
var router = express.Router();


function route(app,passport,mongoose){
	
	router.get('/',function(req,res){
		res.render('admin/index');
	});

	// management of voting centres
	router.get('/voting_centre',function(req,res){
		res.render('admin/voting_centre',{message:req.flash('info')});
	})

	router.post('/voting_centre',function(req,res){
		Utils.add_voting_centre(req.body,function(new_centre){
			console.log(new_centre);
			req.flash("info","You've successfully added a new voting centre to the system. Thank you.")
			res.redirect('/voting_centre');
		})
	})

	router.get('/ministry',function(req,res){
		res.render('admin/ministry', {message:req.flash('info')});
	})

	router.post('/ministry',function(req,res){
		Utils.add_ministry(req.body,function(new_ministry){
			console.log(new_ministry);
			req.flash("info","You've successfully added a new ministry to the system. Remember to add the ministry directors, agencies, departments and objectives. You can find these on the ministry dropdown menu")
			res.redirect('/ministry');
		})
	})

	router.get('/project',function(req,res){
		Utils.get_lgas(function(lgas){
			res.render('admin/project',{lgas:lgas, message:req.flash('info')});
		})
	});


	// routes for adding projects, the benefits and phases
	router.post('/project',function(req,res){
		Utils.add_project(req.body,function(new_project){
			console.log(new_project);
			req.flash("info","You've successfully added a new project to the system. Remember to add the project phases, benefits and previous conditions. Find them on the projects dropdown menu")
			res.redirect('/project');
		})
	})


	

	// end of adding project details

	// routes for managing judiciary content
	router.get('/judiciary',function(req,res){
		res.render('admin/judge',{message:req.flash('info')});
	})

	router.post('/judiciary',function(req,res){
		Utils.add_judge(req.body,function(new_judge){
			console.log(new_judge);
			req.flash("info","You've successfully added a new judge to the system. Thank you.")
			res.redirect('/judiciary');
		})
	});

	

	// routes for managing executive content
	router.get('/executive',function(req,res){
		Utils.get_ministries(function(ministries){
			var mapped_ministries = ministries.map(function(ministry){
				return {ministry:ministry.ministry, id:ministry._id}
			})
			res.render('admin/executives',{ministries:mapped_ministries, message:req.flash('info')});
		})
	});

	router.post('/executive',function(req,res){
		Utils.add_executive(req.body,function(new_executive){
			console.log(new_executive);
			req.flash("info","You've successfully added an executive to the system. Thank you.")
			res.redirect('/executive');
		})
	});

	

	// routes for managing legislator content

	router.get('/legislature',function(req,res){
		res.render('admin/legislature',{message:req.flash('info')});
	});

	router.post('/legislature',function(req,res){
		Utils.add_legislator(req.body,function(new_legislator){
			console.log(new_legislator);
			req.flash("info","You've successfully added a new legislator to the system. Thank you.")
			res.render('admin/legislature');
		})
	})

	// routes for handling departments
	router.get('/department',function(req,res){
		Utils.get_ministries(function(ministries){
			// if there is no ministry, you have to first create a ministry before adding a department :)
			if(ministries.length>0){
				res.render('admin/department',{ministries:ministries, message:req.flash('info')});
			}
			else{
				res.redirect('/ministry');
			}
		})
	})

	router.post('/department',function(req,res){
		Utils.add_department(req.body,function(new_department){
			console.log(new_department);
			req.flash("info","You've successfully added an agency in a ministry. Remember to add the ministry agencies and objectives. You can find them on the ministries dropdown menu.")
			res.redirect('/department');
		})
	})

	// routes for handling agencys
	router.get('/agency',function(req,res){
		Utils.get_ministries(function(ministries){
			// if there is no ministry, you have to first create a ministry before adding an agency :)
			if(ministries.length>0){
				res.render('admin/agency',{ministries:ministries, message:req.flash('info')});
			}
			else{
				res.redirect('/ministry');
			}
		})
	})

	router.post('/agency',function(req,res){
		Utils.add_agency(req.body,function(new_agency){
			console.log(new_agency);
			req.flash("info","You've successfully added an agency in a ministry. Remember to add the ministry departments and objectives. You can find them on the ministries dropdown menu.")
			res.redirect('/agency');
		})
	})

	// routes for handling benefits
	router.get('/benefit',function(req,res){
		Utils.get_projects(function(projects){
			if(projects.length > 0){
				res.render('admin/benefit',{projects:projects, message:req.flash('info')});
			}
			else{
				res.redirect('/project');
			}
		});
	})

	router.post('/benefit',function(req,res){
		Utils.add_benefit(req.body,function(new_benefit){
			console.log(new_benefit)
			req.flash("info","You've successfully added a project previous condition. Remember to add subsequent phases of the project and the project previous conditions. You can find them on the projects dropdown menu.")
			res.redirect('/benefit');
		})
	})

	// routes for handling project phases
	router.get('/phase',function(req,res){
		Utils.get_projects(function(projects){
			if(projects.length > 0){
				res.render('admin/phase',{projects:projects, message:req.flash('info')});
			}
			else{
				res.redirect('/project');
			}
		});
	});

	router.post('/phase',function(req,res){
		Utils.add_phase(req.body,function(new_phase){
			console.log(new_phase);
			req.flash("info","You've successfully added a project previous condition. Remember to add project previous conditions and the project benefits. You can find them on the projects dropdown menu.")
			res.redirect('/phase');
		})
	})

	// routes for handling directors
	router.get('/director',function(req,res){
		Utils.get_ministries(function(ministries){
			res.render('admin/director',{ministries:ministries, message:req.flash('info')});
		})
	})

	router.post('/director',function(req,res){
		Utils.add_director(req.body,function(new_director){
			console.log(new_director);
			req.flash("info","You've successfully added a new ministry director to the system. Remember to add the ministry departments, agencies and departments. Find them on the ministry dropdown menu")
			res.redirect('/director');
		})
	})

	// routes for handling befores
	router.get('/before',function(req,res){
		Utils.get_projects(function(projects){
			res.render('admin/before',{projects:projects,message:req.flash('info')});
		})
	})

	router.post('/before',function(req,res){
		Utils.add_before(req.body,function(new_before){
			console.log(new_before);
			req.flash("info","You've successfully added a project previous condition. Remember to add subsequent phases of the project and the project benefits. They are on the projects dropdown menu.")
			res.redirect('/before');
		})
	});

	router.get('/news',function(req,res){
		res.render('admin/news',{message:req.flash('info')});
	})

	router.post('/news',function(req,res){
		Utils.add_news(req.body, function(new_news){
			console.log(new_news);
			req.flash("info","You've successfully added a news article to the system. Remember to check the sidebar to review it")
			res.redirect('/news');
		})

	});

	router.get('/media',function(req,res){
		res.render('admin/media', {message:req.flash('info')});
	})

	router.post('/media',function(req,res){
		Utils.add_media(req,function(new_media){
			console.log(new_media);
			req.flash("info","You've successfully added a media item to the platform. Remember to view the media item and copy the URL when you want to make use of it.")
			res.redirect('/view?type='+new_media.type);
		})
	});

	router.get('/highlight',function(req,res){
		Utils.get_ministries(function(ministries){
			res.render('admin/highlight',{ministries:ministries, message:req.flash('info')});
		})
	});

	router.post('/highlight',function(req,res){
		Utils.add_highlight(req.body,function(new_highlight){
			console.log(new_highlight);
			req.flash("info","You've successfully added a ministry objective! Consider adding any of the ministry departments, agencies or objectives ")
			res.redirect('/highlight');
		})
	})

	router.get('/objective',function(req,res){
		Utils.get_ministries(function(ministries){
			res.render('admin/objective',{ministries:ministries, message:req.flash('info')});
		})
	});

	router.post('/objective',function(req,res){
		Utils.add_objective(req.body,function(new_objective){
			console.log(new_objective);
			req.flash("info","You've successfully added a ministry objective! Consider adding any of the ministry departments, agencies or ministry work highlights ")
			res.redirect('/objective');
		})
	});

	router.get('/lgas',function(req,res){
		res.render('admin/lga',{message:req.flash('info')});
	});

	router.post('/lgas',function(req,res){
		Utils.add_lga(req.body,function(new_lga){
			console.log(new_lga);
			req.flash("info","You've successfully added a new Local Government Area to the system.")
			res.redirect('/lgas');
		})
	});

	router.get('/ruler',function(req,res){
		res.render('admin/ruler',{message: req.flash('info')});
	})

	router.post('/ruler',function(req,res){
		Utils.add_ruler(req.body,function(new_ruler){
			console.log(new_ruler);
			req.flash("info","You've successfully added a new Traditional Ruler to the system.")
			res.redirect('/ruler')
		})
	})

	// routes for updating and deleting administration information

	router.get('/update',function(req,res){
		// update types = executive, judiciary, legislature,
		if(req.query.type){
			var type = req.query.type;
			switch(type){
				case 'executive':
					Utils.get_executives(function(excos){
						console.log(excos)
						res.render('admin/update/executives',{executives:excos, message:req.flash('info')})
					})
					break;

				case 'judiciary':
					Utils.get_judges(function(judges){
						console.log(judges);
						res.render('admin/update/judiciary',{judges:judges, message:req.flash('info')})
					})
					break;

				case 'legislature':
					Utils.get_legislators(function(legislators){
						console.log(legislators);
						res.render('admin/update/legislature',{legislators:legislators, message:req.flash('info')})
					})
					break;

				case 'voting_centre':
					Utils.get_voting_centres(function(voting_centres){
						console.log(voting_centres);
						res.render('admin/update/voting_centre',{voting_centres:voting_centres, message:req.flash('info')})
					})
					break;

				case 'ministry':
					Utils.get_ministries(function(ministries){
						console.log(ministries);
						res.render('admin/update/ministry',{ministries:ministries, message:req.flash('info')})
					});
					break;

				case 'project':
					Utils.get_projects(function(projects){
						console.log(projects);
						res.render('admin/update/project',{projects:projects, message:req.flash('info')});
					});
					break;

				case 'department':
					Utils.get_departments(function(departments){
						console.log(departments);
						res.render('admin/update/department',{departments:departments, message:req.flash('info')});
					})
					break;

				case 'agency':
					Utils.get_agencies(function(agencies){
						console.log(agencies);
						res.render('admin/update/agency',{agencies:agencies, message:req.flash('info')});
					})
					break;

				case 'benefit':
					Utils.get_benefits(function(benefits){
						console.log(benefits);
						res.render('admin/update/benefit',{benefits:benefits, message:req.flash('info')});
					})
					break;

				case 'phase':
					Utils.get_phases(function(phases){
						console.log(phases);
						res.render('admin/update/phase',{phases:phases, message:req.flash('info')})
					});
					break;

				case 'director':
					Utils.get_directors(function(directors){
						console.log(directors);
						res.render('admin/update/director',{directors:directors, message:req.flash('info')});
					});
					break;

				case 'before':
					Utils.get_befores(function(befores){
						console.log(befores);
						res.render('admin/update/before',{befores:befores, message:req.flash('info')})
					})
					break;

				case 'news':
					Utils.get_all_news(function(all_news){
						console.log(all_news);
						res.render('admin/update/news',{all_news:all_news, message:req.flash('info')});
					})
					break;

				case 'highlight':
					Utils.get_highlights(function(highlights){
						console.log(highlights);
						res.render('admin/update/highlight',{highlights:highlights, message:req.flash('info')});
					})
					break;

				case 'objective':
					Utils.get_objectives(function(objectives){
						console.log(objectives);
						res.render('admin/update/objective',{objectives:objectives, message:req.flash('info')});
					})
					break;

				case 'lgas':
					Utils.get_lgas(function(lgas){
						console.log(lgas);
						res.render('admin/update/lgas',{lgas:lgas, message:req.flash('info')});
					})
					break;

				case 'ruler':
					Utils.get_rulers(function(rulers){
						console.log(rulers);
						res.render('admin/update/ruler',{rulers:rulers, message:req.flash('info')});
					})
			}
		}
		else{
			res.redirect('/')
		}
	})

	router.get('/edit',function(req,res){
		// update types = executive, judiciary, legislature,
		if(req.query.type && req.query.id){
			var type = req.query.type;
			switch(type){
				case 'executive':
					Utils.get_executive({id:req.query.id},function(exco){
						Utils.get_ministries(function(ministries){
							console.log(exco)
							res.render('admin/edit/executives',{executive:exco, ministries:ministries})
						})
					})
					break;

				case 'judiciary':
					Utils.get_judge({id:req.query.id},function(judge){
						console.log(judge);
						res.render('admin/edit/judiciary',{judge:judge})
					})
					break;

				case 'legislature':
					Utils.get_legislator({id:req.query.id},function(legislator){
						console.log(legislator);
						res.render('admin/edit/legislature',{legislator:legislator})
					})
					break;

				case 'voting_centre':
					Utils.get_voting_centre({id:req.query.id},function(voting_centre){
						console.log(voting_centre);
						res.render('admin/edit/voting_centre',{voting_centre:voting_centre});
					});
					break;

				case 'ministry':
					Utils.get_ministry({id:req.query.id},function(ministry){
						console.log(ministry);
						res.render('admin/edit/ministry',{ministry:ministry})
					});
					break;

				case 'project':
					Utils.get_project({id:req.query.id},function(project){
						console.log(project);
						Utils.get_lgas(function(lgas){
							res.render('admin/edit/project',{project:project,lgas:lgas});
						})
					});
					break;

				case 'department':
					Utils.get_ministries(function(ministries){
						Utils.get_department({id:req.query.id},function(department){
							console.log(department);
							res.render('admin/edit/department',{ministries:ministries,department:department})
						})
					});
					break;

				case 'agency':
					Utils.get_ministries(function(ministries){
						Utils.get_agency({id:req.query.id},function(agency){
							console.log(agency);
							res.render('admin/edit/agency',{ministries:ministries,agency:agency})
						})
					});
					break;

				case 'benefit':
					Utils.get_projects(function(projects){
						Utils.get_benefit({id:req.query.id},function(benefit){
							console.log(benefit);
							res.render('admin/edit/benefit',{projects: projects, benefit:benefit});
						})
					})
					break;

				case 'phase':
					Utils.get_projects(function(projects){
						Utils.get_phase({id:req.query.id},function(phase){
							console.log(phase);
							res.render('admin/edit/phase',{projects: projects, phase:phase})
						})
					});
					break;

				case 'director':
					Utils.get_ministries(function(ministries){
						Utils.get_director({id:req.query.id},function(director){
							console.log(director);
							res.render('admin/edit/director',{ministries: ministries, director: director})
						})
					});
					break;

				case 'before':
					Utils.get_projects(function(projects){
						Utils.get_before({id:req.query.id},function(before){
							console.log(before);
							res.render('admin/edit/before',{projects: projects, before: before})
						})
					});
					break;

				case 'news':
					Utils.get_news({id:req.query.id},function(news){
						console.log(news);
						res.render('admin/edit/news',{news:news});
					});
					break;

				case 'highlight':
					Utils.get_ministries(function(ministries){
						Utils.get_highlight({id:req.query.id},function(highlight){
							console.log(highlight);
							res.render('admin/edit/highlight',{ministries:ministries, highlight:highlight})
						})
					});
					break;

				case 'objective':
					Utils.get_ministries(function(ministries){
						Utils.get_objective({id:req.query.id},function(objective){
							console.log(objective);
							res.render('admin/edit/objective',{ministries:ministries, objective:objective});
						})
					});
					break;

				case 'lgas':
					Utils.get_lga({id:req.query.id},function(lga){
						console.log(lga);
						res.render('admin/edit/lga',{lga:lga});
					});
					break;

				case 'ruler':
					Utils.get_ruler({id:req.query.id},function(ruler){
						console.log(ruler);
						res.render('admin/edit/ruler',{ruler:ruler})
					})
			}	
		}
		else{
			res.redirect('/')
		}
	})

	router.get('/delete',function(req,res){
		// update types = executive, judiciary, legislature,
		if(req.query.type && req.query.id){
			var type = req.query.type;
			switch(type){
				case 'executive':
					Utils.remove_executive({id:req.query.id},function(exco){
						console.log(exco)
						req.flash("info", `You successfully removed ${exco.name} (an executive) from the system`)
						res.redirect('/update?type=executive')
					})
					break;

				case 'judiciary':
					Utils.remove_judge({id:req.query.id},function(judge){
						console.log(judge);
						req.flash("info", `You successfully removed ${judge.name} (a judge) from the system`)
						res.redirect('/update?type=judiciary')
					})
					break;

				case 'legislature':
					Utils.remove_legislator({id:req.query.id},function(legislator){
						console.log(legislator);
						req.flash("info", `You successfully removed ${legislator.name} (a legislator) from the system`)
						res.redirect('/update?type=legislature')
					})
					break;

				case 'voting_centre':
					Utils.remove_voting_centre({id:req.query.id},function(voting_centre){
						console.log(voting_centre);
						req.flash("info", `You successfully removed ${voting_centre.address} (a voting centre) from the system`)
						res.redirect('/update?type=voting_centre');
					})
					break;

				case 'ministry':
					Utils.remove_ministry({id:req.query.id},function(ministry){
						console.log(ministry);
						req.flash("info", `You successfully removed Ministry of ${ministry.ministry} from the system`)
						res.redirect('/update?type=ministry');
					})
					break;

				case 'project':
					Utils.remove_project({id:req.query.id},function(project){
						console.log(project);
						req.flash("info", `You successfully removed ${project.title} (a project) from the system`)
						res.redirect('/update?type=project')
					});
					break;

				case 'department':
					Utils.remove_department({id:req.query.id},function(department){
						console.log(department);
						req.flash("info", `You successfully removed department of ${department.name} from the system`)
						res.redirect('/update?type=department');
					});
					break;

				case 'agency':
					Utils.remove_agency({id:req.query.id},function(agency){
						console.log(agency);
						req.flash("info", `You successfully removed agency of ${agency.name} from the system`)
						res.redirect('/update?type=agency');
					});
					break;

				case 'benefit':
					Utils.remove_benefit({id:req.query.id},function(benefit){
						console.log(benefit);
						req.flash("info", `You successfully removed a project benefit ${benefit.title} from the system`)
						res.redirect('/update?type=benefit');
					});

				case 'phase':
					Utils.remove_phase({id:req.query.id},function(phase){
						console.log(phase);
						req.flash("info", `You successfully removed project phase ${phase.title} from the system`)
						res.redirect('/update?type=phase');
					});
					break;

				case 'director':
					Utils.remove_director({id:req.query.id},function(director){
						console.log(director);
						req.flash("info", `You successfully removed a ministry director ${director.name} from the system`)
						res.redirect('/update?type=director');
					});
					break;

				case 'before':
					Utils.remove_before({id:req.query.id},function(before){
						console.log(before);
						req.flash("info", `You successfully removed a project previous condition ${before.title} from the system`)
						res.redirect('/update?type=before');
					});
					break;

				case 'news':
					Utils.remove_news({id:req.query.id},function(news){
						console.log(news);
						req.flash("info", `You successfully removed news article: ${news.title} from the system`)
						res.redirect('/update?type=news');
					});
					break;

				case 'media':
					Utils.remove_media({id:req.query.id},function(media_item){
						console.log(media_item);
						req.flash("info", `You successfully removed a media item ${media_item.title} from the system`)
						res.redirect('/view?type='+req.query.sub);
					});
					break;

				case 'highlight':
					Utils.remove_highlight({id:req.query.id},function(highlight){
						console.log(highlight);
						req.flash("info", `You successfully removed a ministry highlight: ${highlight.title} from the system`)
						res.redirect('/update?type=highlight');
					});
					break;

				case 'objective':
					Utils.remove_objective({id:req.query.id},function(objective){
						console.log(objective);
						req.flash("info", `You successfully removed a ministry objective ${objective.title} from the system`)
						res.redirect('/update?type=objective');
					});
					break;

				case 'lgas':
					Utils.remove_lga({id:req.query.id},function(lga){
						console.log(lga);
						req.flash("info", `You successfully removed a Local Government Area ${lga.name} from the system`)
						res.redirect('/update?type=lgas');
					})
					break;

				case 'ruler':
					Utils.remove_ruler({id:req.query.id},function(ruler){
						console.log(ruler);
						req.flash("info", `You successfully removed a traditional ruler: ${ruler.name} from the system`)
						res.redirect('/update?type=ruler')
					});
					break;
			}
		}
		else{
			res.redirect('/')
		}
	})

	router.post('/update/executive',function(req,res){
		Utils.update_executive(req.body,function(updated_exco){
			console.log(updated_exco);
			req.flash("info", `You successfully updated a state executive ${updated_exco.name} on the system`)
			res.redirect('/update?type=executive')
		})
	})

	router.post('/update/legislature',function(req,res){
		Utils.update_legislator(req.body,function(updated_legislator){
			console.log(updated_legislator);
			req.flash("info", `You successfully updated a state legislator ${updated_legislator.name} on the system`)
			res.redirect('/update?type=legislature')
		})
	})

	router.post('/update/judiciary',function(req,res){
		Utils.update_judge(req.body,function(updated_judge){
			console.log(updated_judge);
			req.flash("info", `You successfully updated a judge ${updated_judge.name} on the system`)
			res.redirect('/update?type=judiciary')
		})
	})

	router.post('/update/voting_centre',function(req,res){
		Utils.update_voting_centre(req.body,function(updated_voting_centre){
			console.log(updated_voting_centre);
			req.flash("info", `You successfully updated a voting centre ${updated_voting_centre.address} on the system`)
			res.redirect('/update?type=voting_centre')
		})
	})

	router.post('/update/ministry',function(req,res){
		Utils.update_ministry(req.body,function(updated_ministry){
			console.log(updated_ministry);
			req.flash("info", `You successfully updated a state ministry ${updated_ministry.ministry} on the system`)
			res.redirect('/update?type=ministry');
		})
	});

	router.post('/update/project',function(req,res){
		Utils.update_project(req.body,function(updated_project){
			console.log(updated_project);
			req.flash("info", `You successfully updated a project ${updated_project.title} on the system`)
			res.redirect('/update?type=project');
		})
	})

	router.post('/update/department',function(req,res){
		Utils.update_department(req.body,function(updated_department){
			console.log(updated_department);
			req.flash("info", `You successfully updated a ministry department ${updated_department.name} on the system`)
			res.redirect('/update?type=department');
		})
	})

	router.post('/update/agency',function(req,res){
		Utils.update_agency(req.body,function(updated_agency){
			console.log(updated_agency);
			req.flash("info", `You successfully updated a ministry agency ${updated_agency.name} on the system`)
			res.redirect('/update?type=agency');
		})
	})

	router.post('/update/benefit',function(req,res){
		Utils.update_benefit(req.body,function(updated_benefit){
			console.log(updated_benefit);
			req.flash("info", `You successfully updated a project benefit ${updated_benefit.title} on the system`)
			res.redirect('/update?type=benefit');
		});
	})

	router.post('/update/agency',function(req,res){
		Utils.update_agency(req.body,function(updated_agency){
			console.log(updated_agency);
			req.flash("info", `You successfully updated a ministry agency ${updated_agency.name} on the system`)
			res.redirect('/update?type=agency');
		});
	});

	router.post('/update/director',function(req,res){
		Utils.update_director(req.body,function(updated_director){
			console.log(updated_director);
			req.flash("info", `You successfully updated a ministry agency ${updated_director.name} on the system`)
			res.redirect('/update?type=director');
		})
	});

	router.post('/update/before',function(req,res){
		Utils.update_before(req.body,function(updated_before){
			console.log(updated_before);
			req.flash("info", `You successfully updated a project previous condition ${updated_before.title} on the system`)
			res.redirect('/update?type=before');
		})
	});
	
	router.post('/update/news',function(req,res){
		Utils.update_news(req.body,function(updated_news){
			console.log(updated_news);
			req.flash("info", `You successfully updated a news article ${updated_news.title} on the system`)
			res.redirect('/update?type=news');
		})
	});

	router.post('/update/highlight',function(req,res){
		console.log('request body',req.body);
		Utils.update_highlight(req.body,function(updated_highlight){
			console.log(updated_highlight);
			req.flash("info", `You successfully updated a ministry projects highlight ${updated_highlight.title} on the system`)
			res.redirect('/update?type=highlight');
		})
	});

	router.post('/update/objective',function(req,res){
		Utils.update_objective(req.body,function(updated_objective){
			console.log(updated_objective);
			req.flash("info", `You successfully updated a ministry objective ${updated_objective.title} on the system`)
			res.redirect('/update?type=objective');
		})
	});

	router.post('/update/lgas',function(req,res){
		Utils.update_lga(req.body,function(updated_lga){
			console.log(updated_lga);
			req.flash("info", `You successfully updated an L.G.A ${updated_lga.name} on the system`)
			res.redirect('/update?type=lgas');
		})
	});

	router.post('/update/ruler',function(req,res){
		Utils.update_ruler(req.body,function(updated_ruler){
			console.log(updated_ruler);
			req.flash("info", `You successfully updated a traditional ruler ${updated_ruler.name} on the system`)
			res.redirect('/update?type=ruler');
		})
	})

	router.get('/view',function(req,res){
		if(req.query.type){
			switch(req.query.type){
				case 'documents':
					Utils.sort_media('documents',function(documents){
						console.log(documents);
						res.render('admin/update/document',{documents:documents});
					});
					break;

				case 'video':
					Utils.sort_media('video',function(videos){
						console.log(videos);
						res.render('admin/update/video',{videos:videos})
					})
					break;

				case 'image':
					Utils.sort_media('image',function(pictures){
						console.log(pictures);
						res.render('admin/update/image',{images:pictures});
					})
					break;
			}
		}
		else{
			res.redirect('/');
		}
	})


	return router;
}
module.exports = route;
