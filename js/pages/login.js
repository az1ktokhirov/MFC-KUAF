// Login/Register Page
import { authService } from '../auth.js';
import { router } from '../router.js';

export async function renderLogin() {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
        router.navigate('#profile');
        return '';
    }

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <div class="form-container">
                        <h1 style="text-align: center; color: #800020; margin-bottom: 30px;">Login to FC KUAF</h1>
                        
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                            <h3 style="margin-bottom: 15px; color: #800020;">Demo Accounts</h3>
                            <div style="margin-bottom: 10px;">
                                <strong>Premium User:</strong><br>
                                Username: <code>premium_user</code><br>
                                Password: <code>premium123</code>
                            </div>
                            <div>
                                <strong>Free User:</strong><br>
                                Username: <code>free_user</code><br>
                                Password: <code>free123</code>
                            </div>
                        </div>

                        <form id="login-form">
                            <div class="form-group">
                                <label for="username">Username or Email</label>
                                <input type="text" id="username" name="username" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                        </form>

                        <div id="login-error" style="display: none; margin-top: 20px; padding: 15px; background: #ffebee; color: #c62828; border-radius: 5px;"></div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

