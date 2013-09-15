
function generateData(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };

var store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
        data: generateData()
});

function getWestPanel(){
	
	 var colors = ['url(#v-1)',
	                  'url(#v-2)',
	                  'url(#v-3)',
	                  'url(#v-4)',
	                  'url(#v-5)'];
	    
	    var baseColor = '#eee';
	    
	    Ext.define('Ext.chart.theme.Fancy', {
	        extend: 'Ext.chart.theme.Base',
	        
	        constructor: function(config) {
	            this.callParent([Ext.apply({
	                axis: {
	                    fill: baseColor,
	                    stroke: baseColor
	                },
	                axisLabelLeft: {
	                    fill: baseColor
	                },
	                axisLabelBottom: {
	                    fill: baseColor
	                },
	                axisTitleLeft: {
	                    fill: baseColor
	                },
	                axisTitleBottom: {
	                    fill: baseColor
	                },
	                colors: colors
	            }, config)]);
	        }
	    });
	    
	    var  temp = new Ext.Panel({
	    	 //title: '医院分布状况',
	    	 flex: 2,
	    	 layout:'fit',
	    	 itmes:[{xtype: 'chart',
	                //height: 300,
	                id: 'chartCmp',
	                animate: true,
	                store: store1,
	                shadow: true,
//	                legend: {
//	                    position: 'right'
//	                },
	                insetPadding: 60,
	                theme: 'Base:gradients',
	                series: [{
	                    type: 'pie',
	                    field: 'data1',
	                    //showInLegend: true,
	                    tips: {
	                      trackMouse: true,
	                      width: 140,
	                      height: 28,
	                      renderer: function(storeItem, item) {
	                        //calculate percentage.
	                        var total = 0;
	                        store1.each(function(rec) {
	                            total += rec.get('data1');
	                        });
	                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
	                      }
	                    },
	                    highlight: {
	                      segment: {
	                        margin: 20
	                      }
	                    },
	                    label: {
	                        field: 'name',
	                        display: 'rotate',
	                        contrast: true,
	                        font: '18px Arial'
	                    }
	                }]
	    	 }]
	    });

var hoschartPanel = new Ext.Panel({
          title: '医院分布状况',
          region: 'west',
          //height: 170,
          draggable: false,
          //hidden: true, 
          //closeAction: 'hide',
          width: 260,
          layout: {
              type:'vbox',
              padding:'5',
              align:'stretch'
          },
          items:[{
              xtype: 'chart',
              flex: 1,
              //height: 300,
              id: 'chartCmp',
              animate: true,
              store: store1,
              shadow: true,
//              legend: {
//                  position: 'right'
//              },
              insetPadding: 60,
              theme: 'Base:gradients',
              series: [{
                  type: 'pie',
                  field: 'data1',
                  //showInLegend: true,
                  tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                      //calculate percentage.
                      var total = 0;
                      store1.each(function(rec) {
                          total += rec.get('data1');
                      });
                      this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                    }
                  },
                  highlight: {
                    segment: {
                      margin: 20
                    }
                  },
                  label: {
                      field: 'name',
                      display: 'rotate',
                      contrast: true,
                      font: '18px Arial'
                  }
              }]
          },temp]
  		});
	return hoschartPanel;
}