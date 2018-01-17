import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* dashboard */
const dashboard = _import('dashboard/index');

const OrderIndex = _import('order/index');

const manufacturerPartInventory = _import('partInventory/manufacturer/index');
const manufacturerStockOrder = _import('partInventory/manufacturer/stockOrder');
const manufacturerStockOrderDetail = _import('partInventory/manufacturer/stockOrderDetail');
const manufacturerPartInventoryChange = _import('partInventory/manufacturer/change/index');


const PartIndex = _import('part/index');
const WarehouseIndex = _import('warehouse/index');
const ModelInfoIndex = _import('model/index');
const SetIndex = _import('set/index');
/* components */
// const componentsIndex = _import('components/index');
// const Tinymce = _import('components/tinymce');
// const Markdown = _import('components/markdown');
// const JsonEditor = _import('components/jsoneditor');
// const DndList = _import('components/dndlist');
// const AvatarUpload = _import('components/avatarUpload');
// const Dropzone = _import('components/dropzone');
// const Sticky = _import('components/sticky');
// const SplitPane = _import('components/splitpane');
// const CountTo = _import('components/countTo');
// const Mixin = _import('components/mixin');


/* charts */
// const chartIndex = _import('charts/index');
// const KeyboardChart = _import('charts/keyboard');
// const KeyboardChart2 = _import('charts/keyboard2');
// const LineMarker = _import('charts/line');
// const MixChart = _import('charts/mixchart');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* error log */
// const ErrorLog = _import('errlog/index');

/* excel */
// const ExcelDownload = _import('excel/index');

/* theme  */
// const Theme = _import('theme/index');

/* example*/
// const TableLayout = _import('example/table/index');
// const DynamicTable = _import('example/table/dynamictable');
// const Table = _import('example/table/table');
// const DragTable = _import('example/table/dragTable');
// const InlineEditTable = _import('example/table/inlineEditTable');

const Form = _import('example/form');
const Tab = _import('example/tab/index');
const Search = _import('example/search');

/* permission */
const Permission = _import('permission/index');
const orderInfoDetail = _import('order/detail/orderInfo');
const orderDetail = _import('order/detail/orderDetail');

const inventory_apply = _import('partInventory/inventory_apply');
const inventory_apply_details = _import('partInventory/detail/Inventory_apply_details');
// const inventory_bad_back = _import('partInventory/inventory_bad_back');
// const bootstrapT = _import('order/detail/bootstrapT');

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
export const asyncRouterMap_EN = [{
        path: '',
        component: Layout,
        redirect: '/dashboard',
        name: 'Home',
        icon: 'homes',
        hidden: false,
        noDropdown: true,
        children: [{ path: 'dashboard', component: dashboard, name: 'Home', hidden: true }]
    },
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        name: '权限测试',
        icon: 'quanxian',
        meta: { role: ['admin'] },
        hidden: true,
        noDropdown: true,
        children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
    },
    // {
    //     path: '/baseInfo',
    //     redirect: '/baseInfo/detail',
    //     component: Layout,
    //     hidden: true,
    //     children: [{ path: 'detail/:orderNumber', component: orderDetail, hidden: true, name: '详细信息' }]
    // },
    {
        path: '/order',
        component: Layout,
        redirect: '/order/index',
        icon: 'order',
        noDropdown: true,
        name: 'Work Order',
        children: [
            { path: 'index', component: OrderIndex, name: 'Work Order' },
            { path: '/baseInfo/detail/:orderNumber', component: orderDetail, name: '详细信息' }
        ]

    },
    {
        path: '/partInventory',
        component: Layout,
        redirect: '/partInventory/index',
        icon: 'inventory',
        name: 'Parts',
        children: [
            { path: 'manufacturer/index', component: manufacturerPartInventory, name: 'Inventory' },
            { path: 'manufacturer/stockOrder', component: manufacturerStockOrder, name: 'Stock Orders' },
            { path: 'manufacturer/stockOrderDetail/:stockOrderNumber', component: manufacturerStockOrderDetail, hidden: true, name: 'warehouse details' },
            { path: 'manufacturer/change/index/:sku/:owner/:providerCode/:inventoryType', hidden: true, component: manufacturerPartInventoryChange, name: 'Inventory water' },
            { path: 'inventory_apply', component: inventory_apply, name: 'Apply parts', meta: { role: ['admin'] } },
            { path: 'detail/:stockOrderNumber', component: inventory_apply_details, hidden: true, name: 'Apply parts', meta: { role: ['admin'] } }
            // { path: 'badback', component: inventory_bad_back, name: 'Bad pieces', meta: { role: ['admin'] } }
        ]

    },
    {
        path: '/components',
        component: Layout,
        redirect: '/components/index',
        name: 'Setting',
        icon: 'set',
        children: [
            { path: 'index', component: PartIndex, name: 'Spare parts' },
            { path: 'warehouse_index', component: WarehouseIndex, name: 'Warehouse' },
            // { path: 'model_index', component: ModelInfoIndex, name: 'Model' }, //三期启用
            { path: 'set_index', component: SetIndex, name: 'Password' }
            // { path: 'index', component: PartIndex, name: '备件库存 ' },
            // { path: 'tinymce', component: Tinymce, name: '备件库存' },
            // { path: 'markdown', component: Markdown, name: '备件出入库单' }
            // { path: 'jsoneditor', component: bootstrapT, name: '测试' }
            // { path: 'dndlist', component: DndList, name: '服务商出入库单' },
            // { path: 'splitpane', component: SplitPane, name: '备件调拨' },
            // { path: 'avatarupload', component: AvatarUpload, name: '服务商申请备件' },
            // { path: 'dropzone', component: Dropzone, name: '坏件返厂' },
            // { path: 'sticky', component: Sticky, name: 'Sticky' },
            // { path: 'countto', component: CountTo, name: 'CountTo' },
            // { path: 'mixin', component: Mixin, name: '小组件' }
        ]
    }
];