
const Dashboard = () => {
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="progress-bar-vertical bg-primary-subtle">
                      <div
                        className="custom-progress-bar bg-primary"
                        data-toggle="progress-bar-vertical"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="70"
                      ></div>
                    </div>
                    <span className="d-block line-height-4">10 Feb, 2020</span>
                    <h4 className="mb-2 mt-2">Hypertensive Crisis</h4>
                    <p className="mb-0 line-height">Ongoing treatment</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="progress-bar-vertical bg-danger-subtle">
                      <div
                        className="custom-progress-bar bg-danger"
                        data-toggle="progress-bar-vertical"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="70"
                      ></div>
                    </div>
                    <span className="d-block line-height-4">12 Jan, 2020</span>
                    <h4 className="mb-2 mt-2">Osteoporosis</h4>
                    <p className="mb-0 line-height">Incurable</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="progress-bar-vertical bg-warning-subtle">
                      <div
                        className="custom-progress-bar bg-warning"
                        data-toggle="progress-bar-vertical"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="70"
                      ></div>
                    </div>
                    <span className="d-block line-height-4">15 Feb, 2020</span>
                    <h4 className="mb-2 mt-2">Hypertensive Crisis</h4>
                    <p className="mb-0 line-height">Examination</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div
                    className="card-body p-0 rounded"
                    style={{
                        backgroundImage: "url('assets/images/page-img/38.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "contain",
                        minHeight: "152px"
                      }}
                      
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card user-profile-block">
              <div className="card-body">
                <div className="user-details-block">
                  <div className="user-profile text-center">
                    <img
                      src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                      alt={String("Logo")}
                      className="rounded-circle img-fluid"
                      style={{ width: "130px" }}

                    />
                  </div>
                  <div className="text-center mt-3 pb-3">
                    <h4><b>Bini Jets</b></h4>
                    <p>Doctor</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                      in arcu turpis. Nunc
                    </p>
                    <a href="#" className="btn btn-primary-subtle">Assign</a>
                  </div>
                  <hr />
                  <ul
                    className="doctoe-sedual d-flex align-items-center justify-content-between p-0 m-0"
                  >
                    <li className="text-center">
                      <h3 className="counter">4500</h3>
                      <span>Operations</span>
                    </li>
                    <li className="text-center">
                      <h3 className="counter">3.9</h3>
                      <span>Medical Rating</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Health Curve</h4>
                </div>
              </div>
              <div className="card-body" style={{ position: "relative" }}
              >
                <div
                  id="home-chart-06"
                  className="h-100"
                  style={{ height: "350px", minHeight: "355px" }}
                  ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">Nearest Treatment</h4>
              </div>
              <div className="course-picker card-body d-flex">
                <input
                  type="hidden"
                  name="inline"
                  className="d-none inline_flatpickr"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h6>APPOINTMENTS</h6>
                <h3><b>5075</b></h3>
              </div>
              <div className="wave-chart-container" style={{ height: "80px" }}
              >
                <div id="wave-chart-7"></div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h6>NEW PATIENTS</h6>
                <h3><b>1200</b></h3>
              </div>
              <div className="wave-chart-container" style={{ height: "80px" }}
              >
                <div id="wave-chart-8"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Hospital Management</h4>
                </div>
              </div>
              <div className="card-body hospital-mgt">
                <div className="progress mb-4" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "20%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    OPD
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    80%
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "30%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Treatment
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "70%" }}
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    70%
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "40%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Laboratory Test
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "40%" }}
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    85%
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "40%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    New Patient
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    70%
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "35%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Doctors
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "65%" }}
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    95%
                  </div>
                </div>
                <div className="progress" style={{ height: "30px" }}
                >
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "28%" }}
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    Discharge
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "70%" }}

                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    35%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Patient Progress</h4>
                </div>
              </div>
              <div className="card-body">
                <ul className="patient-progress m-0 p-0">
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Bud Jet</h6>
                    </div>
                    <span className="badge badge-primary">30%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Barney Cull</h6>
                    </div>
                    <span className="badge badge-success">70%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Eric Shun</h6>
                    </div>
                    <span className="badge badge-danger">15%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Rick Shaw</h6>
                    </div>
                    <span className="badge badge-warning">55%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Ben Effit</h6>
                    </div>
                    <span className="badge badge-info">45%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Rick Shaw</h6>
                    </div>
                    <span className="badge badge-warning">55%</span>
                  </li>
                  <li
                    className="d-flex mb-3 align-items-center justify-content-between"
                  >
                    <div className="media-support-info">
                      <h6>Marge Arita</h6>
                    </div>
                    <span className="badge badge-primary">65%</span>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div className="media-support-info">
                      <h6>Barry Cudat</h6>
                    </div>
                    <span className="badge badge-danger">15%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title">
                  <h4>Patient Overview</h4>
                </div>
              </div>
              <div className="card-body">
                <div id="home-chart-03" className="chart" style={{ height: "280px" }}
                ></div>
              </div>
            </div>
          </div>
  
          <div className="col-lg-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Visits From Countries</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="details">
                  <span className="title text-dark">United States</span>
                  <div className="percentage float-end text-primary">
                    95
                    <span>%</span>
                  </div>
                  <div className="progress-bar-linear d-inline-block w-100">
                    <div
                      className="progress bg-primary-subtle shadow-none w-100"
                      style={{ height: "6px" }}
                      >
                      <div
                        className="progress-bar bg-primary"
                        data-toggle="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="90"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="details mt-4">
                  <span className="title text-dark">India</span>
                  <div className="percentage float-end text-warning">
                    75
                    <span>%</span>
                  </div>
                  <div className="progress-bar-linear d-inline-block w-100">
                    <div
                      className="progress bg-warning-subtle shadow-none w-100"
                      style={{ height: "6px" }}
                      >
                      <div
                        className="progress-bar bg-warning"
                        data-toggle="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="75"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="details mt-4">
                  <span className="title text-dark">Australia</span>
                  <div className="percentage float-end text-success">
                    55
                    <span>%</span>
                  </div>
                  <div className="progress-bar-linear d-inline-block w-100">
                    <div
                      className="progress bg-success-subtle shadow-none w-100"
                      style={{ height: "6px" }}
                      >
                      <div
                        className="progress-bar bg-success"
                        data-toggle="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="55"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="details mt-4">
                  <span className="title text-dark">Brazil</span>
                  <div className="percentage float-end text-danger">
                    25
                    <span>%</span>
                  </div>
                  <div className="progress-bar-linear d-inline-block w-100">
                    <div
                      className="progress bg-danger-subtle shadow-none w-100"
                      style={{ height: "6px" }}
                      >
                      <div
                        className="progress-bar bg-danger"
                        data-toggle="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuenow="25"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
