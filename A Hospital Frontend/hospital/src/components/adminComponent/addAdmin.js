import '../../styles/addAdmin.css';

function Addadmin() {
    return (
        <>
            <div class="container">
                <h1 style={{textAlign : 'center' , color : 'black'}}> Add Admin</h1>
                <form action="/admin/register" method="POST">
                <h2 className='mt-3'>Personal Information :</h2>
                <div className='row mt-3'>
                    <div class="form-group col-4">
                        <label for="name" class="label">Name:</label>
                        <input type="text" id="name" name="name" class="input-field" required />
                    </div>
                    <div class="form-group col-4">
                        <label for="mobileNo" class="label">Mobile Number:</label>
                        <input type="tel" id="mobileNo" name="mobileNo" class="input-field" required />
                    </div>
                    <div class="form-group col-4">
                        <label for="profile" class="label">Profile:</label>
                        <input type="file" id="profile" name="profile" class="input-field" required />
                    </div>
                </div>
                <div className='row'>
                    <div class="form-group col-4">
                        <label for="status" class="label">Status:</label>
                        <select id="status" name="status" class="input-field" required>
                            <option value="Active">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                        </select>
                    </div>
                </div>
                <h2 className='mt-3'>Account Details :</h2>
                <div className='row mt-3'>
                    <div class="form-group col-4">
                        <label for="email" class="label">Email:</label>
                        <input type="email" id="email" name="email" class="input-field" required />
                    </div>
                    <div class="form-group col-4">
                        <label for="password" class="label">Password:</label>
                        <input type="password" id="password" name="password" class="input-field" required />
                    </div>
                </div>
                    <div class="form-group">
                        <button type="submit" class="button">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Addadmin;