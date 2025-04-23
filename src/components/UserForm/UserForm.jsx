const UserForm = () => {
    return (
        <div className="mt-2">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="John Doe"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="youremail@example.com"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="************"/>
                        </div>
                        <button type="submit" className="btn btn-warning w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserForm;