$$(document).on('page:init', '.page[data-name="kolejka"]', function(e) { //zdarzenie otwarcia strony z wirtualną listą

          axios
              .get('http://localhost/cgi-bin/kolejka.cgi') //api url
              .then(response => {
                  console.log(response.data);
                  var virtualList = app.virtualList.create({
                      // List Element
                      el: '.virtual-list',
                      // Pass array with items
                      items: response.data, //JSON z api
                      // Custom search function for searchbar
                      searchAll: function(query, items) {
                          var found = [];
                          for (var i = 0; i < items.length; i++) {
                              if (items[i].liczba.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                          }
                          return found; //return array with mathced indexes
                      },
                      // List item Template7 template
                      itemTemplate: '<li>' +
                          '<a href="#" class="item-link item-content">' +
                          '<div class="item-inner">' +
                          '<div class="item-title-row">' +
                          '<div class="item-title">Liczba:</div>' +
                          '</div>' +
                          '<div class="item-subtitle">{{liczba}}</div>' +
                          '</div>' +
                          '</a>' +
                          '</li>',
                      // Item height
                      height: app.theme === 'ios' ? 63 : (app.theme === 'md' ? 73 : 46),
                  });
              });
            });
