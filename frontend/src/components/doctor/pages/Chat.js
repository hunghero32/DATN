import React from "react";

const Chat = () => {
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row cust-chat">
        <div className="col-lg-3 chat-data-left scroller">
          <div className="chat-sidebar-channel scroller ps-3">
            <h5 className="ms-3">Public Channels</h5>
            <ul
              className="iq-chat-ui nav flex-column nav-pills pe-0"
              role="tablist"
            >
              <li>
                <a
                  className="d-none"
                  data-bs-toggle="pill"
                  data-bs-target="#default-block"
                  aria-selected="false"
                  role="tab"
                  tabIndex="-1"
                >
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <img
                        src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                        alt="chatuserimage"
                        className="avatar-50 rounded"
                      />
                      <span className="avatar-status">
                        <i className="ri-checkbox-blank-circle-fill text-success"></i>
                      </span>
                    </div>
                    <div className="chat-sidebar-name">
                      <h6 className="mb-0">Team Discussions</h6>
                      <span>Lorem Ipsum is</span>
                    </div>
                    <div className="chat-meta float-end text-center mt-2">
                      <div className="chat-msg-counter bg-primary text-white">
                        20
                      </div>
                      <span className="text-nowrap">05 min</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  data-bs-toggle="pill"
                  data-bs-target="#chatbox1"
                  aria-selected="true"
                  role="tab"
                  className="active"
                >
                  <div className="d-flex align-items-center cursor-pointer">
                    <div className="avatar me-3">
                      <img
                        src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                        alt="chatuserimage"
                        className="avatar-50 rounded"
                      />
                      <span className="avatar-status">
                        <i className="ri-checkbox-blank-circle-fill text-success"></i>
                      </span>
                    </div>
                    <div className="chat-sidebar-name">
                      <h6 className="mb-0">Team Discussions</h6>
                      <span>Lorem Ipsum is</span>
                    </div>
                    <div className="chat-meta float-end text-center mt-2">
                      <div className="chat-msg-counter bg-primary text-white">
                        20
                      </div>
                      <span className="text-nowrap">05 min</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="chat-data chat-data-right">
            <div className="tab-content">
              <div className="tab-pane fade" id="default-block" role="tabpanel">
                <div className="chat-start">
                  <span className="iq-start-icon text-primary">
                    <i className="ri-message-3-line"></i>
                  </span>
                  <button id="chat-start" className="btn bg-primary mt-3">
                    Start Conversation!
                  </button>
                </div>
              </div>
              <div
                className="tab-pane fade active show"
                id="chatbox1"
                role="tabpanel"
              >
                <div className="chat-head">
                  <header className="d-flex justify-content-between align-items-center pt-3 pe-3 ps-3 pb-3">
                    <div className="d-flex align-items-center">
                      <div className="sidebar-toggle bg-primary-subtle">
                        <i className="ri-menu-3-line"></i>
                      </div>
                      <div className="avatar chat-user-profile m-0 me-3">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                        <span className="avatar-status">
                          <i className="ri-checkbox-blank-circle-fill text-success"></i>
                        </span>
                      </div>
                      <h5 className="mb-0">Team Discussions</h5>
                    </div>
                    <div className="chat-user-detail-popup scroller">
                      <div className="user-profile text-center">
                        <button type="submit" className="close-popup p-3">
                          <i className="ri-close-fill"></i>
                        </button>
                        <div className="user mb-4">
                          <a className="avatar m-0">
                            <img
                              src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                              alt="avatar"
                            />
                          </a>
                          <div className="user-name mt-4">
                            <h4>Bini Jordan</h4>
                          </div>
                          <div className="user-desc">
                            <p>Cape Town, RSA</p>
                          </div>
                        </div>
                        <hr />
                        <div className="chatuser-detail text-start mt-4">
                          <div className="row">
                            <div className="col-6 col-md-6 title">
                              Bini Name:
                            </div>
                            <div className="col-6 col-md-6 text-end">Bini</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-6 col-md-6 title">Tel:</div>
                            <div className="col-6 col-md-6 text-end">
                              072 143 9920
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-6 col-md-6 title">
                              Date Of Birth:
                            </div>
                            <div className="col-6 col-md-6 text-end">
                              July 12, 1989
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-6 col-md-6 title">Gender:</div>
                            <div className="col-6 col-md-6 text-end">Male</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-6 col-md-6 title">
                              Language:
                            </div>
                            <div className="col-6 col-md-6 text-end">
                              Engliah
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
                <div className="chat-content scroller">
                  <div className="chat">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/05.jpg"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:45</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>How can we help? We're here for you! 😄</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat chat-left">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:48</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>
                          Hey John, I am looking for the best admin template.
                        </p>
                        <p>Could you please help me to find it out? 🤔</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/05.jpg"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:49</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>Absolutely!</p>
                        <p>
                          XRay Dashboard is the responsive bootstrap 5 admin
                          template.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="chat chat-left">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:52</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>Looks clean and fresh UI.</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/05.jpg"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:53</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>Thanks, from ThemeForest.</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat chat-left">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:54</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>I will purchase it for sure. 👍</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat">
                    <div className="chat-user">
                      <a className="avatar m-0">
                        <img
                          src="https://templates.iqonic.design/xray-dist/html/assets/images/user/05.jpg"
                          alt="avatar"
                          className="avatar-50 rounded"
                        />
                      </a>
                      <span className="chat-time mt-1">6:56</span>
                    </div>
                    <div className="chat-detail">
                      <div className="chat-message">
                        <p>Okay Thanks..</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-footer p-3">
                  <form
                    className="d-flex align-items-center gap-3"
                    action="javascript:void(0);"
                  >
                    <div className="chat-attagement d-flex">
                      <a href="javascript:void(0);" className="dropdown">
                        <i
                          className="fa fa-smile-o pe-3"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div className="dropdown-menu p-0 border-0">
                          <emoji-picker data-target-input="#chat-input-1"></emoji-picker>
                        </div>
                      </a>

                      <a href="javascript:void(0);">
                        <i className="fa fa-paperclip" aria-hidden="true"></i>
                      </a>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="chat-input-1"
                      placeholder="Type your message"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2-1"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary-subtle d-flex align-items-center p-2"
                    >
                      <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                      <span className="d-none d-lg-block ms-1">Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
