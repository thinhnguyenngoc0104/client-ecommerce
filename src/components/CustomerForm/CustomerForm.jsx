import './CustomerForm.css'

const CustomerForm = ({customerName, setCustomerName, phone, setPhone}) => {
    return (
        <div className="pt-2">
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="customer-name" className="col-4">Customer Name</label>
                    <input type="text" name="customer-name" id="customer-name"
                           className="form-control form-control-sm"
                           onChange={(e) => {
                               setCustomerName(e.target.value)
                           }}
                           value={customerName}/>
                </div>
            </div>
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="customer-phone" className="col-4">Phone</label>
                    <input type="text" name="customer-phone" id="customer-phone"
                           className="form-control form-control-sm"
                           onChange={(e) => {
                               setPhone(e.target.value)
                           }}
                           value={phone}/>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm