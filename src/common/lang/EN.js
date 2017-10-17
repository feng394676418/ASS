import enLocale from 'element-ui/lib/locale/lang/en';

export default {
    order: {
        searchplaceholder: 'Work order no. / waybill no.',
        NewWorkOrder: 'New Work Order',
        EditWorkOrder: 'Edit',
        orderList: 'Work order list',
        refNumber: 'Work order No.',
        userName: 'Customer',
        userInfo: 'Customer Info.',
        trackingNo: 'Shipment AWB No.',
        productType: 'Model',
        imei: 'IMEI No.',
        facilitatorName: 'Service Provider',
        owner: 'Manufacturer',
        status: 'Status',
        createDate: 'Create time',
        operation: 'Operation',
        daterange: 'Date range',
        serviceprovider: 'Service provider',
        selectowner: 'Select owner',
        selectOrderInfo: 'Please select work order information',
        tel: 'Tel',
        mail: 'E-mail',
        country: 'Country',
        choose: 'Please choose',
        province: 'State',
        city: 'City',
        zipcode: 'Zip code',
        address: 'Address',
        Alternativecontact: 'Alternative contact',
        Alternativecontacttel: 'Alternative contact tel',
        AWBNo: 'AWB No.',
        AWBNoisNull: 'AWB No. is empty',
        Courier: 'Courier',
        CourierIsNull: 'Courier is empty',
        Purchasedate: 'Purchase date',
        Color: 'Color',
        Accessories: 'Accessories',
        Otheraccessories: 'Other accessories',
        Giftbox: 'Giftbox',
        USBcable: 'USB cable',
        Poweradaptor: 'Power adaptor',
        Appearance: 'Appearance',
        Appearancedescription: 'Appearance description',
        Failuredescription: 'Failure description',
        Serviceprovideraddress: 'Service provider address',
        Serviceprovidertel: 'Service provider tel',
        Cancel: 'Cancel',
        Affirm: 'Affirm',
        editOK: 'Edited successfully',
        statusItems: [
            { name: 'All', value: '0', status: '-1' },
            { name: 'Pending acceptance', value: '0', status: '11' },
            { name: 'Pending test', value: '0', status: '12' },
            { name: 'Pending quotation', value: '0', status: '13' },
            { name: 'Pending repair', value: '0', status: '14' },
            { name: 'Pending QC', value: '0', status: '15' },
            { name: 'Pending payment', value: '0', status: '16' },
            { name: 'Pending shipment', value: '0', status: '17' },
            { name: 'Pending receival', value: '0', status: '18' },
            { name: 'Finished', value: '0', status: '19' }
        ],
        logStatusNameArray: [
            { name: 'New', status: 11 },
            { name: 'Edit', status: 1 },
            { name: 'Acceptance', status: 12 },
            { name: 'Test', status: 13 },
            { name: 'Confirm', status: 14 },
            { name: 'Repair', status: 15 },
            { name: 'QC', status: 16 },
            { name: 'Payment', status: 17 },
            { name: 'Shipping', status: 18 },
            { name: 'Finished', status: 19 }
        ],
        appearanceOptions: [
            { value: 'Normal' },
            { value: 'Abnormal' }
        ],
        // 工单详情页
        Detail: {
            partActuralUseTitle: 'Actual Use Part Info',
            workordernumber: 'work order no.',
            productinformation: 'Product Info.',
            Serviceproviderinfo: 'Service provider Info.',
            Producttesting: 'Product testing',
            Physicalmodel: 'Physical model',
            Match: 'Match',
            Mismatch: 'Mismatch',
            PhysicalIMEI: 'Physical IMEI',
            Servicetype: 'Service type',
            RepairLevel: 'Repair Level',
            IdentifiedFailure: 'Identified Failure',
            SKU: 'SKU',
            Sparepartsname: 'Spare parts name',
            Quantity: 'Quantity',
            Price: 'Price',
            Inboundshippingcost: 'Inbound shipping cost',
            OutboundShippingCost: 'Outbound Shipping Cost',
            Servicecost: 'Service cost',
            Total: 'Total',
            QCreport: 'QC report',
            QCFail: 'QC Fail',
            malfunction: 'Malfunction',
            FullFunctionReport: 'Full Function Report',
            TransactionNo: 'Transaction No.',
            QCPass: 'QC Pass',
            solved: 'Solved',
            unsolved: 'Unsolved',
            Payment: 'Payment',
            ShipmentInfo: 'Shipment Info.',
            Courier: 'Courier',
            AWBNo: 'AWB No.',
            RecipientAddress: 'Recipient Address',
            ProcessedWorkOrder: 'Processed Work Order',
            Accepted: 'Accepted',
            Note: 'Note',
            Normal: 'Normal',
            Abnormal: 'Abnormal',
            Acceptsfailed: 'Accepts failed! Exception information',
            Acceptedsuccessfully: 'Accepted successfully',
            settlementover: 'The settlement is over',
            Billingupdatefailed: 'Billing update failed',
            Examing: 'Examing',
            Examingfinish: 'Examing finish!',
            Productmodelconfirmation: 'Product model confirmation',
            IMEInumberconfirmation: 'IMEI number confirmation',
            Causeoffailure: 'Cause of failure',
            addtext: 'Upload photos can not exceed 5Mb, support JPEG, PNG, GIF. Upload up to five.',
            Sparepartsrequesttable: 'Spare parts request table',
            Enterthesparepartcode: 'spare part code',
            Sparepartscodename: 'Spare parts code / name',
            Totaloffer: 'Total offer',
            Confirmtheoffer: 'Confirm the offer',
            Quotationdescription: 'Have you checked the quotation for the work order checklist and have you confirmed your offer?',
            Repair: 'Repair',
            usingspareparts: 'Actual maintenance using spare parts',
            Confirmtherepair: 'Have you confirmed that work order maintenance has been completed?',
            Shipping: 'Shipping',
            Sendername: 'Sender name',
            received: 'Received',
            Confirmreceipt: 'Confirm that the customer has received the goods',
            Confirmreceiptdescription: 'Confirmed that the goods have been received, the end of work orders?',
            QC: 'QC',
            Inspectionreport: 'Inspection report',
            IssuesSolved: 'Issues Solved?',
            Fullfunctiontestresults: 'Full Function Report results',
            yes: 'Yes',
            no: 'No',
            qualityResult: 'Quality is over',
            receiptFinished: 'Receipt finished!',
            Inwarranty: 'In warranty',
            Outwarranty: 'Out warranty',
            Canuploadimages: 'You can only upload up to 5 images!',
            imagesformatincorrect: 'The upload image is not formatted correctly!',
            Maximumimage: 'Upload image size can not exceed 5MB!',
            worryaboutyourIQ: 'This spare part already existed，please adjust the number if you want to add more',
            Accessoriesadded: 'Selected accessories have been added, please delete!',
            Quoteconfirmedfinished: 'Quote confirmed finished',
            Quoteconfirmationfailed: 'Quote confirmation failed',
            updatesuccess: 'Maintenance completed update success',
            updatefailed: 'The maintenance failed to complete the update',
            enterworkorderno: 'Please enter the work order number first',
            notallowedtoedit: 'Work order accepted, not allowed to edit!',
            China: 'China',
            Guangdong: 'Guangdong',
            Shenzhen: 'Shenzhen',
            Deliveryfinished: 'Delivery finished!',
            Exceptional: 'Exceptional:',
            Getexception: 'Logistics channel access exception:',
            ShippingExpressCode: 'Please choose the logistics!',
            deliverywarehouse: 'Please select the delivery warehouse!',
            Accessories: 'Accessories',
            downloadWaybill: 'Download Waybill',
            establishmentworkorder: 'created Work Order for customer, Work Order pending accepted.',
            workorderaccepted: 'Edited Work Order, Work Order pending accepted.',
            workordertested: 'Accepted Work Order, Work Order pending test.',
            Workorderconfirmed: 'tested Work Order, Work Order pending quotation.',
            workorderrepaired: 'Confirmed quotation, Work Order pending repair.',
            Workorderqualityinspection: 'Finished repair, Work Order pending QC.',
            workordersettled: 'Finished Quality Check, Quality Check pass，Work Order pending payment.',
            workorderdelivered: 'Finished Quality Check, Quality Check pass，Work Order pending deliver goods.',
            workordershipped: 'Confirmed payment, Work Order pending shipment.',
            workorderreceived: 'Confirmed shipment, Work Order pending received.',
            endworkorder: 'Shipment status shows as received, Work Order finished.',
            TransactionNoNOTNULL: 'Transaction No. cannot be null!'
        },
        modalNotInput: 'The product modal must be set!',
        imeiNoNotInput: 'The IMEI NO. must be set!',
        toDo_tasks: 'to-do tasks',
        noData: 'none'
    },
    export: 'Export',
    BACK: 'Back',
    Add: 'Add',
    exception: 'An exception occurs',
    MSG_OK: 'Successful operation！',
    MSG_NG: 'operation failed！',
    Unreadmessage: 'Unread message',
    Personalinfo: 'Personal info.',
    Changepassword: 'Change password',
    Logout: 'Log out',
    Chinese: '简体中文',
    WingsingASS: 'Wingsing ASS',
    // WingsingASS: 'Wingsing after-sales management system',
    password: 'Password',
    Login: 'Log in',
    Forgotpassword: 'Forgot your password (or first login)',
    legalemail: 'Please enter the correct legal email',
    passworddigits: 'The password can not be less than 6 digits',
    all: 'All',
    // 备件
    part: {
        Sparepartslist: 'Spare parts list',
        Newspareparts: 'New spare parts',
        Modifyspareparts: 'Modify spare parts',
        Effective: 'Effective',
        Failure: 'Failure',
        coding: 'Coding',
        weight: 'weight',
        Tagcode: 'Tag code',
        owner: 'Owner',
        price: 'Inside price',
        outPrice: 'Outside price',
        unit: 'Unit',
        suitModel: 'Applicable models',
        description: 'Description',
        chooseaccessoryinfo: 'Please choose an accessory information!',
        selectaccessoriesinfo: 'Please select accessories information!',
        entershipper: 'code / name ...',
        Sparepartsform: 'Spare parts application form',
        Auditresults: 'Audit results',
        selectaccessories: 'Please select accessories!',
        partsapplicationsuccessful: 'Spare parts application is successful!',
        partcannotbeempty: 'Spare part code can not be empty!',
        partshavebeenadd: 'The spare parts have been added, please modify the quantity!',
        statusNameOptions: [{ status: 11, name: 'Pending review' }, { status: 12, name: 'Pending shipping' }, { status: 13, name: 'Pending receival' }, { status: 14, name: 'Finshed' }, { status: 1, name: 'Finshed' }],
        passOptions: [{ status: '11', name: 'No pass' }, { status: '1', name: 'No pass' }, { status: '12', name: 'pass' }, { status: '13', name: 'pass' }, { status: '14', name: 'pass' }],
        statusENOptions: [{ status: '0', name: 'Effective' }, { status: '1', name: 'Failure' }],
        logStatusArray: [{ status: 11, name: 'New' }, { status: 12, name: 'Review' }, { status: 13, name: 'Shipping' }, { status: 14, name: 'Finished' }, { status: 1, name: 'Unapproved' }],
        Sparepartsappform: 'Spare parts application form',
        Numberofapplications: 'Number of applications',
        Serviceproexistinginventory: 'Service provider existing inventory',
        Deliverywarehouse: 'Delivery warehouse',
        Review: 'Review',
        pass: 'pass',
        Fail: 'Fail',
        reason: 'reason',
        orderpendingreview: 'order created，pending review',
        approvedpendingshipment: 'approved, order pending shipment',
        shippedpendingreceival: 'shipped，pending receival',
        receivedorderfinished: 'received，order finished',
        Unapprovedorderclosed: 'Unapproved, order closed',
        Confirmdelivery: 'Confirm delivery?',
        Reviewapplication: 'Review service provider spare parts application',
        Notthroughreason: 'Not through reason',
        examinationpassed: 'examination passed',
        Auditnotpassed: 'Audit not passed',
        whyauditnotpass: 'The reason why the audit does not pass',
        Successfulprocessing: 'The processing results were updated successfully',
        addPartOK: 'New-add accessory successfully',
        addPartNG: 'New-add accessory failed',
        editPartOK: 'Edit accessory successfully',
        editPartNG: 'Edit accessory failed',
        isExistPart: 'Part code is exist',
        import: 'Import',
        importParts: 'Import spare parts',
        importExplain: 'Please fill in the data in the format of the import template',
        templatesDownload: 'Template download',
        matters: 'Matters needing attention',
        mattersNo1: 'All fields are required',
        mattersNo2: 'In warranty price, out of warranty price, weight set into text format'
    },
    Warehouse: {
        enterwarehousecode: 'warehouse code / English name / Chinese name ...',
        WarehouseList: 'Warehouse List',
        NewWarehouse: 'New Warehouse',
        Modifythewarehouse: 'Modify the warehouse',
        Enabled: 'Enabled',
        Disabled: 'Disabled',
        Warehousecode: 'Warehouse code',
        WarehouseShortCode: 'Warehouse Short Code',
        Englishname: 'English name',
        Chinesename: 'Chinese name',
        Shipper: 'Shipper',
        owner: 'Manufacturer',
        status: 'status',
        Modifypeople: 'Modify people',
        Changethetime: 'Modified time',
        Overallintroduction: 'Overall introduction',
        SystemCODE: 'System CODE',
        selectshipper: 'Please select the Manufacturer',
        awarehouseinformation: 'Please choose a warehouse information!',
        warehouseinformation: 'Please select the warehouse information!',
        statusOptions: [{ status: '0', name: 'Enabled' }, { status: '1', name: 'Disabled' }],
        newaddsuc: 'New-add warehouse successfully',
        newaddfai: 'New-add warehouse failed',
        neweditsuc: 'Edit warehouse successfully',
        neweditfai: 'Edit warehouse failed',
        enablesuc: 'Enable warehouse success',
        enablefai: 'Enable warehouse failed',
        disablesuc: 'Disable warehouse success',
        disablefai: 'Disable warehouse failed'
    },
    inventory: {
        title: 'Inventory List',
        entershipper: 'SKU(Spare Part No.)',
        owner: 'Manufacture',
        provider: 'Service Provider',
        inventoryType: 'Good/Bad',
        sku: 'SKU(Spare Part No.)',
        name: 'Spare parts name',
        unit: 'Unit',
        qty: 'Quantity',
        checkTime: 'Check time',
        ViewSerial: 'View Serial',
        change: {
            inventoryChangeTitle: 'Stock serial',
            createDate: 'Date',
            sku: 'SKU (Spare Part No.)',
            cnName: 'Spare Parts Name',
            orderNumber: 'Order No.',
            changeType: 'Type',
            qty: 'Quantity',
            oldQty: 'Original Stock',
            newQty: 'Current Stock'
        }
    },
    stockOrder: {
        searchplaceholder: 'Order No.',
        title: 'Spare Part Inventory Orders',
        odrNumber: 'order No.',
        owner: 'Manufacture',
        productType: 'Good/Bad',
        orderType: 'Order Type',
        inOutType: 'Inventory Type',
        shippingFrom: 'Shipping From',
        shippingTo: 'Shipping To',
        createDate: 'Create time',
        createUserName: 'Create user',
        viewDetail: 'Detail',
        productTypeOptions: [{ label: 'Good', value: 0 }, { label: 'Bad', value: 1 }],
        inOutTypeOptions: [{ label: 'Spare parts application', value: '10' }, { label: 'Bad parts return', value: '20' }, { label: 'Manufacture Transfer', value: '30' }],
        orderTypeOptions: [{ name: 'inbound' }, { name: 'outbound' }],
        detail: {
            inventoryDetails: 'Inventory Details',
            serialNo: 'Serial No.',
            sku: 'SKU(Spare Part No.)',
            name: 'Spare parts name',
            unit: 'Unit',
            qty: 'Quantity'
        }
    },
    phonemodel: {
        entermodelcode: 'Model code / English name / Chinese name ...',
        modelList: 'Model List',
        newmodel: 'New model',
        modifymodel: 'Modify model',
        effect: 'Effect',
        invalid: 'Invalid',
        modelcode: 'Model code',
        shipper: 'Owner',
        chinesename: 'Chinese name',
        englishname: 'English name',
        status: 'Status',
        remark: 'Remark',
        modifypeople: 'Modify people',
        changethetime: 'Modified time',
        amodelinfo: 'Please choose a model information！',
        modelinfo: 'Please select the model information！',
        statusOptions: [{ status: '0', name: 'Effect' }, { status: '1', name: 'Invalid' }],
        newaddsuc: 'New-add model successfully!',
        newaddfai: 'New-add model failed!',
        repeatnewadd: 'New-add model failed、duplicate model code!',
        neweditsuc: 'Edit model successfully!',
        neweditfai: 'Edit model failed!'
    },
    insufficientStock: 'Insufficient stock!',
    noStockInfo: 'No stock information!',
    oldpassword: 'Old password:',
    newpassword: 'New password:',
    confirmpassword: 'confirm password:',
    enterpassword: 'Please enter your password',
    enterpasswordagain: 'Please enter your password again',
    Passwordinconsistent: 'Password is inconsistent',
    passwordexist: 'The new password cannot be the same as the original password!',
    passwordupdateok: 'Password update success!',
    passwordupdatefl: 'Password update failure!',
    ...enLocale
}