define([
	'app',
	'apps/menu/list/list_view'
], function(App, View){
	App.module("MenuApp.List", function(List, App, Backbone, Marionette, $, _){
		List.Controller = {
			listKanbans: function(){
				require(["entities/kanban"], function(){
					var kanbans = App.request("kanban:entities");

					$.when(kanbans).done(function(){
						var kanbansListView = new View.Kanbans({
							collection: kanbans
						});

						kanbansListView.on("home:clicked", function(){
							App.trigger("home:show");
						});

						kanbansListView.on("kanban:clicked", function(href){
							App.trigger("kanban:show", href);
						});

						kanbansListView.on("logout:clicked", function(){

							window.localStorage.removeItem('multikanban user');
							App.loggedInUser = undefined;
							App.trigger("landing:show");
						});

						kanbansListView.on("kanban:new", function(){
							console.log("kanban:new");
			                var newKanban = App.request("kanban:entity:new");

			                

			                kanbansListView.on("kanban:submit", function(title){
			                	console.log("kanban:submit");
			                	var data = { 'title' : title };

			                	console.log(data);
			               		newKanban.save(data).then(function(){
			               			kanbans.add(newKanban);
			               		});


			               			// go to new kanban
			               			// show new kanban as selected
			                });
			            });

			            kanbansListView.on("childview:kanban:delete", function(ChildView, args){
			            	console.log("kanban:delete");

			            	args.model.destroy();
		               		//si el kanban que es borra es en el que s'esta anar a home
		               		
			            });

			            kanbansListView.on("childview:kanban:edit", function(ChildView, model, title){
			            	console.log("kanban:edit");
			            	var data = { 'title' : title };
			            	console.log("args");
			            	console.log(model);
			            	
			            	model.save(data);
		               		//App.trigger("menu:show");
		               		
			            });

						App.mainLayout.headerRegion.show(kanbansListView);
					});
				});
			}
		}
	});

	return App.MenuApp.List.Controller;
});