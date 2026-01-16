//Khoi tao danh sach san pham
function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [

{ id:1,status:1,title:'Rau xào ngũ sắc',img:'./assets/img/products-webp/rau-xao-ngu-sac.webp',category:'Món chay',price:180000,desc:'Rau củ theo mùa xào thanh đạm.'},
{ id:2,status:1,title:'Đậu hũ sốt nấm đông cô',img:'./assets/img/products-webp/dau-hu-xao-nam-chay.webp',category:'Món chay',price:150000,desc:'Đậu hũ mềm béo sốt nấm.'},
{ id:3,status:1,title:'Nấm đùi gà xào cháy tỏi',img:'./assets/img/products-webp/nam-dui-ga-chay-toi.webp',category:'Món chay',price:170000,desc:'Nấm xào tỏi thơm lừng.'},
{ id:4,status:1,title:'Canh rong biển chay',img:'./assets/img/blank-image.webp',category:'Món chay',price:120000,desc:'Canh rong biển thanh mát.'},
{ id:5,status:1,title:'Cơm chiên chay thập cẩm',img:'./assets/img/products-webp/com-chay-cha-bong.webp',category:'Món chay',price:140000,desc:'Cơm chiên rau củ.'},
{ id:6,status:1,title:'Bí đỏ kho tiêu chay',img:'./assets/img/blank-image.webp',category:'Món chay',price:130000,desc:'Bí đỏ kho tiêu đậm vị.'},
{ id:7,status:1,title:'Gỏi ngó sen chay',img:'./assets/img/blank-image.webp',category:'Món chay',price:160000,desc:'Gỏi chay thanh mát.'},
{ id:8,status:1,title:'Đậu que xào tỏi',img:'./assets/img/blank-image.webp',category:'Món chay',price:120000,desc:'Đậu que giòn ngọt.'},
{ id:9,status:1,title:'Nấm kho tiêu',img:'./assets/img/blank-image.webp',category:'Món chay',price:150000,desc:'Nấm kho cay nhẹ.'},
{ id:10,status:1,title:'Canh chua chay',img:'./assets/img/blank-image.webp',category:'Món chay',price:140000,desc:'Canh chua rau củ.'},
{ id:11,status:1,title:'Đậu hũ chiên sả',img:'./assets/img/blank-image.webp',category:'Món chay',price:130000,desc:'Đậu hũ chiên sả thơm.'},
{ id:12,status:1,title:'Mì xào chay',img:'./assets/img/products-webp/mien-xao-rau-cu-chay.webp',category:'Món chay',price:150000,desc:'Mì xào rau củ.'},

/* ===== MÓN MẶN (13–24) ===== */
{ id:13,status:1,title:'Gà chiên mắm',img:'./assets/img/products-webp/ga_u_muoi.webp',category:'Món mặn',price:220000,desc:'Gà chiên mắm tỏi.'},
{ id:14,status:1,title:'Sườn non rim mặn',img:'./assets/img/blank-image.webp',category:'Món mặn',price:260000,desc:'Sườn non mềm.'},
{ id:15,status:1,title:'Cá kho tộ',img:'./assets/img/products-webp/ca_chien_gion_sot_mam.webp',category:'Món mặn',price:240000,desc:'Cá kho truyền thống.'},
{ id:16,status:1,title:'Bò xào lúc lắc',img:'./assets/img/products-webp/goi-bo-kho.webp',category:'Món mặn',price:280000,desc:'Bò mềm xào rau.'},
{ id:17,status:1,title:'Tôm rang muối',img:'./assets/img/products-webp/tom-su-rang-muoi.webp',category:'Món mặn',price:300000,desc:'Tôm rang muối mặn mà.'},
{ id:18,status:1,title:'Heo quay giòn bì',img:'./assets/img/products-webp/thit-quay.webp',category:'Món mặn',price:320000,desc:'Heo quay da giòn.'},
{ id:19,status:1,title:'Cá chiên sốt cà',img:'./assets/img/products-webp/ca-chien-gion-mam-thai.webp',category:'Món mặn',price:230000,desc:'Cá chiên sốt cà.'},
{ id:20,status:1,title:'Gà kho gừng',img:'./assets/img/products-webp/ga-khong-loi-thoat.webp',category:'Món mặn',price:210000,desc:'Gà kho gừng ấm vị.'},
{ id:21,status:1,title:'Thịt kho trứng',img:'./assets/img/products-webp/thit_nuong.webp',category:'Món mặn',price:250000,desc:'Món kho truyền thống.'},
{ id:22,status:1,title:'Cánh gà chiên nước mắm',img:'./assets/img/products-webp/canh-dua-bo-ham.webp',category:'Món mặn',price:230000,desc:'Cánh gà mắm tỏi.'},
{ id:23,status:1,title:'Bò kho bánh mì',img:'./assets/img/products-webp/khau-nhuc.webp',category:'Món mặn',price:280000,desc:'Bò kho đậm đà.'},
{ id:24,status:1,title:'Mực xào sa tế',img:'./assets/img/blank-image.webp',category:'Món mặn',price:290000,desc:'Mực xào cay nhẹ.'},

/* ===== MÓN LẨU (25–34) ===== */
{ id:25,status:1,title:'Lẩu nấm chay',img:'./assets/img/products-webp/lau-thai-nam-chay.webp',category:'Món lẩu',price:350000,desc:'Lẩu nấm thanh ngọt.'},
{ id:26,status:1,title:'Lẩu thái hải sản',img:'./assets/img/products-webp/lau_thai.webp',category:'Món lẩu',price:420000,desc:'Lẩu chua cay.'},
{ id:27,status:1,title:'Lẩu bò nhúng dấm',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:450000,desc:'Bò tươi nhúng.'},
{ id:28,status:1,title:'Lẩu gà lá é',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:400000,desc:'Gà lá é thơm.'},
{ id:29,status:1,title:'Lẩu cá kèo',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:420000,desc:'Lẩu cá miền Tây.'},
{ id:30,status:1,title:'Lẩu hải sản chua cay',img:'./assets/img/products-webp/lau-thai-tomyum.webp',category:'Món lẩu',price:480000,desc:'Hải sản tươi.'},
{ id:31,status:1,title:'Lẩu riêu cua',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:430000,desc:'Riêu cua đậm vị.'},
{ id:32,status:1,title:'Lẩu dê',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:480000,desc:'Dê hầm bổ dưỡng.'},
{ id:33,status:1,title:'Lẩu kim chi',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:390000,desc:'Lẩu Hàn Quốc.'},
{ id:34,status:1,title:'Lẩu chay thập cẩm',img:'./assets/img/blank-image.webp',category:'Món lẩu',price:330000,desc:'Lẩu chay đa dạng.'},

/* ===== TRÁNG MIỆNG (35–44) ===== */
{ id:35,status:1,title:'Chè khúc bạch',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:90000,desc:'Chè mát lạnh.'},
{ id:36,status:1,title:'Rau câu dừa',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:80000,desc:'Rau câu béo.'},
{ id:37,status:1,title:'Bánh flan',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:70000,desc:'Flan mềm mịn.'},
{ id:38,status:1,title:'Kem vani',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:60000,desc:'Kem mát lạnh.'},
{ id:39,status:1,title:'Chè đậu xanh',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:65000,desc:'Chè truyền thống.'},
{ id:40,status:1,title:'Bánh chuối hấp',img:'./assets/img/products-webp/banh-chuoi-nuong.webp',category:'Tráng miệng',price:75000,desc:'Bánh chuối thơm.'},
{ id:41,status:1,title:'Sữa chua nếp cẩm',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:70000,desc:'Sữa chua dẻo.'},
{ id:42,status:1,title:'Chè bưởi',img:'./assets/img/products-webp/che-buoi.webp',category:'Tráng miệng',price:80000,desc:'Chè bưởi giòn.'},
{ id:43,status:1,title:'Kem chocolate',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:65000,desc:'Kem socola.'},
{ id:44,status:1,title:'Bánh tiramisu',img:'./assets/img/blank-image.webp',category:'Tráng miệng',price:120000,desc:'Bánh Âu.'},

/* ===== NƯỚC UỐNG (45–54) ===== */
{ id:45,status:1,title:'Trà đào cam sả',img:'./assets/img/products-webp/tra-dao-chanh-sa.webp',category:'Nước uống',price:55000,desc:'Trà thanh mát.'},
{ id:46,status:1,title:'Nước ép cam',img:'./assets/img/blank-image.webp',category:'Nước uống',price:50000,desc:'Cam tươi.'},
{ id:47,status:1,title:'Sinh tố bơ',img:'./assets/img/blank-image.webp',category:'Nước uống',price:65000,desc:'Bơ béo.'},
{ id:48,status:1,title:'Trà chanh',img:'./assets/img/blank-image.webp',category:'Nước uống',price:40000,desc:'Trà chanh mát.'},
{ id:49,status:1,title:'Cà phê sữa',img:'./assets/img/blank-image.webp',category:'Nước uống',price:45000,desc:'Cà phê Việt.'},
{ id:50,status:1,title:'Nước suối',img:'./assets/img/blank-image.webp',category:'Nước uống',price:20000,desc:'Tinh khiết.'},
{ id:51,status:1,title:'Sinh tố xoài',img:'./assets/img/blank-image.webp',category:'Nước uống',price:60000,desc:'Xoài chín.'},
{ id:52,status:1,title:'Trà sữa trân châu',img:'./assets/img/products-webp/tra-pho-mai-kem-sua.webp',category:'Nước uống',price:55000,desc:'Trà sữa béo.'},
{ id:53,status:1,title:'Nước ép dưa hấu',img:'./assets/img/products-webp/nuoc-ep-dau-tay.webp',category:'Nước uống',price:45000,desc:'Dưa hấu mát.'},
{ id:54,status:1,title:'Trà gừng mật ong',img:'./assets/img/blank-image.webp',category:'Nước uống',price:50000,desc:'Ấm cổ.'},

/* ===== MÓN KHÁC (55–60) ===== */
{ id:55,status:1,title:'Bánh mì bơ tỏi',img:'./assets/img/blank-image.webp',category:'Món khác',price:60000,desc:'Bánh mì nướng.'},
{ id:56,status:1,title:'Khoai tây chiên',img:'./assets/img/blank-image.webp',category:'Món khác',price:70000,desc:'Khoai giòn.'},
{ id:57,status:1,title:'Salad dầu giấm',img:'./assets/img/blank-image.webp',category:'Món khác',price:120000,desc:'Salad tươi.'},
{ id:58,status:1,title:'Gỏi cuốn',img:'./assets/img/blank-image.webp',category:'Món khác',price:90000,desc:'Gỏi cuốn tươi.'},
{ id:59,status:1,title:'Chả giò chiên',img:'./assets/img/products-webp/cha-com.webp',category:'Món khác',price:110000,desc:'Chả giò giòn.'},
{ id:60,status:1,title:'Bánh bao nhân mặn',img:'./assets/img/blank-image.webp',category:'Món khác',price:50000,desc:'Bánh bao nóng.'}
    ];
    localStorage.setItem('products', JSON.stringify(products));
    }
}
// Create admin account 
function createAdminAccount() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
        accounts = [];
        accounts.push({
            fullname: "Hoàng Gia Bảo",
            phone: "hgbaodev",
            password: "123456",
            address: 'https://github.com/hgbaodev',
            email: 'musicanime2501@gmail.com',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1
        })
        accounts.push({
            fullname: "Trần Nhật Sinh",
            phone: "0123456789",
            password: "123456",
            address: '',
            email: '',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

// Initialize products and accounts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    createProduct();
    createAdminAccount();
});
