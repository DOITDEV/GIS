/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.GridWindow',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Map',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',
        'MyDesktop.rentinfo.Rent',
        'MyDesktop.Settings',
        'MyDesktop.leas.LesseeGridWindow',
        'MyDesktop.user.UserWindow',
        'MyDesktop.rentinfo.ThirdRent',
        'MyDesktop.pay.PayWindow'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();
        this.desktop.initShortcut();

        // now ready...
    },

    getModules : function(){
        return [
            new MyDesktop.VideoWindow(),
            //new MyDesktop.Blockalanche(),
            new MyDesktop.SystemStatus(),
            new MyDesktop.GridWindow(),
            new MyDesktop.TabWindow(),
            new MyDesktop.AccordionWindow(),
            new MyDesktop.Map(),
            new MyDesktop.BogusMenuModule(),
            new MyDesktop.BogusModule(),
            new MyDesktop.rentinfo.Rent(),
            new MyDesktop.leas.LesseeGridWindow(),
            new MyDesktop.user.UserWindow(),
            new MyDesktop.rentinfo.ThirdRent(),
            new MyDesktop.pay.PayWindow()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: '租赁信息', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: '用户管理', iconCls: 'accordion-shortcut', module: 'user-win' },
                    { name: 'Map', iconCls: 'map-shortcut', module: 'map' },
                    { name: '出租方', iconCls: 'rent-shortcut', module: 'grid-win-rent' },
                    { name: '承租方', iconCls: 'leas-shortcut', module: 'lessee-win' },
                    { name: '支付信息', iconCls: 'pay-shortcut', module: 'pay-win' },
                    { name: '第三方信息', iconCls: 'thirdrent-shortcut', module: 'third-rent' },
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', '您确定要退出系统?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
