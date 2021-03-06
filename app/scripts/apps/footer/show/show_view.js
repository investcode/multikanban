define([
	'app',
	"tpl!apps/footer/show/templates/list_item.tpl"
], function(App, listItemTpl){
	App.module("FooterApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Footer = Marionette.ItemView.extend({
			tagName: "li",
			template: listItemTpl
		});

		View.Footers = Marionette.CollectionView.extend({
			tagName: "ul",
			childView: View.Footer,

			triggers: { 
				"click .home": "home:show",
				"click .help": "help:show",
				"click .about": "about:show"
			}
		});
	});

	return App.FooterApp.Show.View;
});