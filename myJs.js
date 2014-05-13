MyApp = new Backbone.Marionette.Application();


/**
                                    REGIONS
**/
MyApp.addRegions({
    mainRegion: "#profile",
    secondRegion: "#personne"
});


/**
                                    PROFILES
**/
Profile = Backbone.Model.extend({
    
});

Profiles = Backbone.Collection.extend({
    model: Profile,
    url: 'profile2.json'
});

ProfileView = Backbone.Marionette.ItemView.extend({
    template: "#profile-template",
    tagName: 'tr',
    className: 'profile',
    events:{
      'click .nom':'nav'
    },
    nav : function(){
       Backbone.history.navigate('/personnes',true);
    }
});

ProfilesView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  ele: "tbody",
  className: "table-striped table-bordered",
  template: "#profiles-template",
  itemView: ProfileView,
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(this.ele).append(itemView.el);
  }
});

/**
                                    PERSONNES
**/
Personne = Backbone.Model.extend({});

Personnes = Backbone.Collection.extend({
    model: Personne,
    url: 'profiles.json'
});

PersonneView = Backbone.Marionette.ItemView.extend({
    template: "#personne-template",
    tagName: 'tr',
    className: 'personne',
    events:{
      'click .name':'nav'
    },
    nav : function(){
       Backbone.history.navigate('/profiles',true);
    }
});

PersonnesView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  ele: "tbody",
  className: "table-striped table-bordered",
  template: "#personnes-template",
  itemView: PersonneView,
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(this.ele).append(itemView.el);
  }
});


/**
                                    ROUTER
**/



//define router class
var GalleryRouter = Backbone.Router.extend ({
  routes: {
    'personnes': 'goPersonnes',
    'profiles': 'goProfiles'
  },
  goPersonnes: function(){
    MyApp.mainRegion.close();
    MyApp.secondRegion.show(MyApp.page[0]);
  },
  goProfiles:function(){    
    MyApp.secondRegion.close();
    MyApp.mainRegion.show(MyApp.page[1]);
  }
});
/**

                      CLASSSSSSSSS
**/


function instanceView(tab){
    var myCollections;
    var myCollectionsViews = [];

    myCollections = tab.slice(0);

    for(var i = 0 ; i<myCollections.length; i++){
        var tempCollection;
        eval('tempCollection = new ' + myCollections[i] +'()' );
        tempCollection.fetch();

        var tempCollectionView;
        eval('tempCollectionView = new ' + myCollections[i] + 'View({collection: tempCollection})');
        myCollectionsViews.push(tempCollectionView);
    }
    

    this.getCollectionsViews = function(){
        return myCollectionsViews;
    };

}


$(document).ready(function() {
    
      
      var appRouter = new GalleryRouter();      
      
      MyApp.page =  new instanceView(['Personnes','Profiles']).getCollectionsViews().slice(0);

      Backbone.history.start();
      Backbone.history.navigate('/personnes',true);
      MyApp.start();
      

      
});