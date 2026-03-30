 ================= STEP 1 =================

            <div class="signup-step step-1">

                <div class="progress-header">

                    <span class="step-text">
                        Step 1 of 4
                    </span>

                    <span class="step-percent">
                        25%
                    </span>

                </div>

                <div class="progress-bar">

                    <div class="progress-fill">

                    </div>

                </div>

                <p class="role-label">

                    Role Selection

                </p>

                <div class="role-grid">

                    <!-- Traveler -->

                    <div class="role-card">

                        <div class="role-icon">

                            <img src="../components/ui/landing/traveler.png">

                        </div>

                        <h4>
                            Traveler
                        </h4>

                        <p>

                            Explore the world and book
                            services tailored to your wanderlust.

                        </p>

                    </div>

                    <!-- Service Partner -->

                    <div class="role-card">

                        <div class="role-icon">

                            <img src="../components/ui/landing/partner.png">

                        </div>

                        <h4>
                            Service Partner
                        </h4>

                        <p>

                            Offer premium services
                            to travelers worldwide.

                        </p>

                    </div>

                    <!-- Local Guide -->

                    <div class="role-card">

                        <div class="role-icon">

                            <img src="../components/ui/landing/guide.png">

                        </div>

                        <h4>
                            Local Guide
                        </h4>

                        <p>

                            Share local knowledge
                            and guide travelers.

                        </p>

                    </div>

                </div>

                <button class="next-btn">

                    Next Step

                </button>

                <p class="signup-link">

                    Already have an account?

                    <a href="#">

                        Log in

                    </a>

                </p>

            </div>

            <!-- ================= STEP 2 ================= -->

            <div class="signup-step step-2 hidden">

                <div class="progress-header">
                    <span class="step-text">Step 2 of 4</span>
                    <span class="step-percent">50%</span>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%;"></div>
                </div>

                <p class="form-subtitle">
                    Common Account Details
                </p>

                <h3 class="form-title">
                    Create Your Account
                </h3>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Full Name</label>
                        <input id="fullName" type="text">
                    </div>

                    <div class="form-group">
                        <label>Username (6-20 alphabets only)</label>
                        <input id="username" type="text" >
                        <small class="success-text">
                            <!-- ✓ Username available -->
                        </small>
                    </div>

                    <div class="form-group">
                        <label>Email Address</label>
                        <input id="email" type="email" placeholder="hello@example.com">
                    </div>

                    <div class="form-group">
                        <label>Phone Number</label>
                        <input id="phone" type="tel" placeholder="+1 (555) 000-0000">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input id="password" type="password" placeholder="••••••••">
                    </div>

                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="••••••••">
                    </div>

                </div>

                <div class="form-actions">

                    <button class="back-btn">
                        ← Back
                    </button>

                    <button class="next-btn">
                        Next →
                    </button>

                </div>

            </div>



<!-- Step 3 : Guide Details -->

            <div class="signup-step step-3 hidden">

                <div class="signup-card">

                    <div class="progress-header">

                        <span>
                            Step 3 of 4
                        </span>

                        <span>
                            75%
                        </span>

                    </div>

                    <div class="progress-bar">

                        <div class="progress-fill"></div>

                    </div>

                    <h3 class="form-title">
                        Guide Details
                    </h3>

                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                Areas of Expertise
                            </label>

                            <input
                                type="text"
                                id="expertise"
                                placeholder="e.g. Trekking, City Tours"
                            >

                        </div>

                        <div class="form-group">

                            <label>
                                Languages Spoken
                            </label>

                            <input
                                type="text"
                                id="languages"
                                placeholder="e.g. English, Hindi"
                            >

                        </div>

                        <div class="form-group">

                            <label>
                                Years of Experience
                            </label>

                            <input
                                type="number"
                                id="experience"
                                placeholder="e.g. 5"
                            >

                        </div>

                        <div class="form-group">

                            <label>
                                License Number
                            </label>

                            <input
                                type="text"
                                id="license"
                                placeholder="Enter license ID"
                            >

                        </div>

                    </div>

                    <div class="form-actions">

                        <button
                            class="back-btn"
                            id="step3BackBtn"
                        >

                            Back

                        </button>

                        <button
                            class="next-btn"
                            id="completeSignupBtn"
                        >

                            Complete Sign Up

                        </button>

                    </div>

                </div>

            </div>