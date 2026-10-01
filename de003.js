let currentOrderCode = ""
let isOrderValid =  false
let totalRevenue = 0
let totalOrders = 0

while (true) {
    console.log(`
        ============================================
            HỆ THỐNG THANH TOÁN NHÀ SÁCH TRI THỨC
        ============================================
        1. Nhập và kiểm chuẩn mã đơn hàng
        2. Tính tiền đơn sách
        3. Thẩm định mã hóa đơn may mắn
        0. Thoát chương trình
        ============================================
        `);
    let choice = prompt("Vui lòng nhập lựa chọn (0-3): ")
    switch (choice) {
        case "1":
            currentOrderCode = ""
            isOrderValid = false

            let inputNewCodeOrder = prompt("Nhập mã đơn hàng: ")
            if (inputNewCodeOrder === null || inputNewCodeOrder === "") {
                console.log("Chưa nhập mã đơn hàng");
                break
            }
            inputNewCodeOrder = inputNewCodeOrder.trim().toUpperCase()

            if(inputNewCodeOrder.length < 6){
                console.log("Mã phải tối thiểu 6 ký tự");
            }else if(!inputNewCodeOrder.startsWith("BOK-")){
                console.log("Mã phải bắt đầu là BOK-");
            }else if(inputNewCodeOrder.includes(" ")){
                console.log("Không chứa khoảng trắng ở giữa")
            }else{
                currentOrderCode = inputNewCodeOrder
                isOrderValid = true
                console.log("Xác nhận thành công mã hàng: ",currentOrderCode);
                
            }
            break
        case "2":
            if(isOrderValid === false){
                console.log("Vui lòng thực hiện case 1 trước");
                break
            }
            let inputBookcount = prompt("Nhập số lượng cuốn sách: ")
            if(inputBookcount === null){
                console.log("Hủy thao tác");
                break
            }

            let BookCount = Number(inputBookcount)
            while (!Number.isInteger(BookCount) || BookCount <=0){
                console.log("Phải là số nguyên dương lớn hơn 0");
                inputBookcount = prompt("Nhập lại số lượng sách: ")

                if(inputBookcount === null){
                    console.log("hủy thao tác");
                    break
                }
                BookCount = Number(inputBookcount)
            }
            if(inputBookcount === null){
                break;
            }

            let inputpricePerBook = prompt("Nhập giá sách: ")
            if (inputpricePerBook === null){
                console.log("Hủy thao tác");
                break
            }
            let pricePerBook = Number(inputpricePerBook)
            while(!Number.isInteger(pricePerBook) || pricePerBook <=0){
                console.log("Phải là số nguyên dương lớn hơn 0");
                inputpricePerBook = prompt("Nhập lại giá sách: ")

                if(inputpricePerBook === null){
                    console.log("Hủy thao tác");
                    break
                }
                pricePerBook = Number(inputpricePerBook)
            }
            if(inputpricePerBook === null){
                break;
            }

            let baseCost = BookCount * pricePerBook
            let discount = 0
            if(BookCount >=4){
                discount = Math.round(baseCost * 0.1)
            }
            let packBook = Math.round((baseCost - discount) * 0.08)
            let totalPayment = (baseCost - discount) + packBook
            totalRevenue += totalPayment
            totalOrders++;
            console.log(`
                Mã đơn hàng: ${currentOrderCode}
                Số cuốn sách: ${BookCount}
                Giá mỗi cuốn: ${pricePerBook}
                Chi phí cơ sở: ${baseCost}
                Tiền giảm giá: ${discount}
                Phí bọc sách và đóng gói: ${packBook}
                Tổng thanh toán: ${totalPayment}
                `);
                currentOrderCode = ""
                isOrderValid = false
            break;
        case "3":
            let luckyCodeOrder = prompt("Nhập mã đơn may mắn: ")
            if(luckyCodeOrder === null){
                console.log("hủy thao tác");
                break
            }
            luckyCodeOrder = luckyCodeOrder.trim()

            let isValid = true
            if(luckyCodeOrder === ""){
                isOrderValid = false
                
            }
            if(luckyCodeOrder.length < 2){
                isValid = false
                
            }

            for(let i = 0; i<luckyCodeOrder.length; i++){
                if(luckyCodeOrder[i] < "0" ||luckyCodeOrder[i] > "9" ){
                    isValid = false
                    break
                }
            }
            let isAllZero = true
            for (let i = 0;i < luckyCodeOrder.length ; i++){
                if(luckyCodeOrder[i] !== "0"){
                    isAllZero = false
                    
                }
            }
            if(isValid === false || isAllZero === true){
                console.log("Mã may mắn không hợp lệ");
                break
            }
            let reverseCode = ""
            for(let j = luckyCodeOrder.length -1 ; j>=0 ; j--){
                reverseCode += luckyCodeOrder[j]
            }
            let isSymmetrical = luckyCodeOrder === reverseCode
            let digitSum = 0 
            for(let i = 0; i<luckyCodeOrder.length ; i++){
                digitSum += Number(luckyCodeOrder[i])
            }
            let isDivisiblebyNine = digitSum % 9 === 0
            let prize = ""
             
            if(isSymmetrical === true && isDivisiblebyNine === true){
                prize = "Giải đặt biệt"
            }else if(isSymmetrical === true){
                prize = "Giải nhất"
            }else if(isDivisiblebyNine === true){
                prize = "Giải nhì"
            }else{
                prize = "Không có giải"
            }
            console.log(`
                Mã gốc: ${luckyCodeOrder}
                Mã đảo ngược: ${reverseCode}
                Tổng chữ số: ${digitSum}
                Chia hết cho 9: ${isDivisiblebyNine ? "có" : "không"}
                Giải thưởng: ${prize}
                `);
            break 
        case "0":
            console.log("Đã thoát chương trình");
            break
        default:
            console.log("Lựa chọn không hợp lệ");
            break;
            
    }    

    if(choice === "0"){
        break
    }
}