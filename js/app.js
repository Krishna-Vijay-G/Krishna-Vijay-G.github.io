/**
 * Hygieia Frontend Application
 * API Communication and UI Management for separated frontend/backend architecture
 */

// Global configuration
const HygieiaAPI = {
    // Backend configuration - user will need to update this when running backend
    baseURL: 'http://127.0.0.1:5000',
    endpoints: {
        health: '/api/health',
        dermatology: '/api/dermatology/analyze',
        heartDisease: '/api/heart-disease/analyze',
        breastCancer: '/api/breast-cancer/analyze',
        diabetes: '/api/diabetes/analyze',
        results: '/api/results',
        blockchain: '/api/blockchain',
        chatbot: '/api/chatbot',
        uploads: '/api/uploads'
    },
    timeout: 30000, // 30 second timeout
    maxRetries: 3
};

// Application state
window.HygieiaApp = {
    isProcessing: false,
    currentModule: null,
    backendStatus: 'checking',
    sessionId: null,
    uploadedFiles: {},
    formValidation: {},
    
    // Initialize application
    init: function() {
        this.generateSessionId();
        this.setupEventListeners();
        this.initializeTooltips();
        this.setupFormValidation();
        this.setupImageHandling();
        this.setupAccessibility();
        this.detectCurrentModule();
        this.checkBackendStatus();
        this.startStatusMonitoring();
        console.log('Hygieia Frontend initialized successfully');
    },
    
    // Generate session ID for user tracking
    generateSessionId: function() {
        this.sessionId = localStorage.getItem('hygieia_session') || 
                         'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('hygieia_session', this.sessionId);
    },
    
    // Detect current module based on URL
    detectCurrentModule: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename.includes('dermatology')) this.currentModule = 'dermatology';
        else if (filename.includes('heart-disease')) this.currentModule = 'heart_disease';
        else if (filename.includes('breast-cancer')) this.currentModule = 'breast_cancer';
        else if (filename.includes('diabetes')) this.currentModule = 'diabetes';
        else if (filename.includes('results')) this.currentModule = 'results';
        else if (filename.includes('chatbot')) this.currentModule = 'chatbot';
        else this.currentModule = 'home';
    }
};

// ==================== API COMMUNICATION ====================

HygieiaApp.makeAPIRequest = async function(endpoint, options = {}) {
    const url = HygieiaAPI.baseURL + endpoint;
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: HygieiaAPI.timeout
    };
    
    const requestOptions = { ...defaultOptions, ...options };
    
    // Add timeout functionality
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestOptions.timeout);
    requestOptions.signal = controller.signal;
    
    try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Network error' }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - backend may be unavailable');
        }
        throw error;
    }
};

HygieiaApp.uploadFile = async function(file, endpoint) {
    const url = HygieiaAPI.baseURL + endpoint;
    const formData = new FormData();
    formData.append('image', file);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HygieiaAPI.timeout);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Upload timeout - file may be too large');
        }
        throw error;
    }
};

// ==================== BACKEND STATUS MONITORING ====================

HygieiaApp.checkBackendStatus = async function() {
    try {
        const response = await this.makeAPIRequest(HygieiaAPI.endpoints.health);
        if (response.status === 'online') {
            this.updateBackendStatus('online');
            return true;
        }
    } catch (error) {
        console.warn('Backend health check failed:', error.message);
        this.updateBackendStatus('offline');
        return false;
    }
    return false;
};

HygieiaApp.updateBackendStatus = function(status) {
    this.backendStatus = status;
    const statusElement = document.getElementById('backend-status');
    const statusDot = statusElement?.querySelector('.status-dot');
    const statusText = statusElement?.querySelector('span');
    
    if (statusElement) {
        statusElement.className = `backend-status ${status}`;
        if (statusText) {
            statusText.textContent = status === 'online' ? 'Backend Online' : 'Backend Offline';
        }
    }
    
    // Update diagnostic cards based on backend status
    this.updateDiagnosticCards(status === 'online');
};

HygieiaApp.updateDiagnosticCards = function(backendOnline) {
    const diagnosticCards = document.querySelectorAll('.diagnostic-card');
    diagnosticCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            if (backendOnline) {
                button.classList.remove('disabled');
                button.removeAttribute('disabled');
            } else {
                button.classList.add('disabled');
                button.setAttribute('disabled', 'true');
            }
        }
    });
};

HygieiaApp.startStatusMonitoring = function() {
    // Check status every 30 seconds
    setInterval(() => {
        this.checkBackendStatus();
    }, 30000);
};

// ==================== EVENT LISTENERS ====================

HygieiaApp.setupEventListeners = function() {
    // Form submission handlers
    document.addEventListener('submit', this.handleFormSubmission.bind(this));
    
    // File upload handlers
    document.addEventListener('change', this.handleFileSelection.bind(this));
    
    // Navigation enhancement
    document.addEventListener('click', this.handleNavigation.bind(this));
    
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Backend status click handler
    const statusElement = document.getElementById('backend-status');
    if (statusElement) {
        statusElement.addEventListener('click', () => {
            this.showBackendInfo();
        });
    }
    
    // Diagnostic card click handlers
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.diagnostic-card');
        if (card && this.backendStatus !== 'online') {
            e.preventDefault();
            this.showBackendOfflineModal();
        }
    });
};

HygieiaApp.showBackendInfo = function() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Backend Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Status:</strong> ${this.backendStatus}</p>
                    <p><strong>Backend URL:</strong> ${HygieiaAPI.baseURL}</p>
                    <p><strong>Last Check:</strong> ${new Date().toLocaleTimeString()}</p>
                    ${this.backendStatus === 'offline' ? 
                        '<div class="alert alert-warning">Backend is not running. Start the backend server to use diagnostic features.</div>' : 
                        '<div class="alert alert-success">Backend is running normally.</div>'
                    }
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="HygieiaApp.checkBackendStatus()">Recheck</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
};

HygieiaApp.showBackendOfflineModal = function() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-warning text-dark">
                    <h5 class="modal-title"><i class="fas fa-exclamation-triangle me-2"></i>Backend Not Available</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>The backend server is not currently running. To use diagnostic features:</p>
                    <ol>
                        <li>Start the backend server by running: <code>python backend_api.py</code></li>
                        <li>Wait for the "Backend Online" indicator to appear</li>
                        <li>Try your request again</li>
                    </ol>
                    <div class="alert alert-info">
                        <strong>Note:</strong> The frontend can run independently, but diagnostic features require the backend API.
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="HygieiaApp.checkBackendStatus()">Check Again</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
};

// ==================== FORM HANDLING ====================

HygieiaApp.handleFormSubmission = async function(event) {
    const form = event.target.closest('form');
    if (!form) return;
    
    event.preventDefault();
    
    // Check backend status
    if (this.backendStatus !== 'online') {
        this.showBackendOfflineModal();
        return;
    }
    
    // Prevent multiple submissions
    if (this.isProcessing) {
        return;
    }
    
    // Validate form before submission
    const isValid = this.validateForm(form);
    if (!isValid) {
        this.showValidationErrors(form);
        return;
    }
    
    this.isProcessing = true;
    this.showProcessingState(form);
    
    try {
        let result;
        
        // Handle different diagnostic modules
        if (this.currentModule === 'dermatology') {
            result = await this.submitDermatologyForm(form);
        } else if (this.currentModule === 'heart_disease') {
            result = await this.submitHeartDiseaseForm(form);
        } else if (this.currentModule === 'breast_cancer') {
            result = await this.submitBreastCancerForm(form);
        } else if (this.currentModule === 'diabetes') {
            result = await this.submitDiabetesForm(form);
        }
        
        if (result && result.success) {
            this.showResults(result);
        } else {
            this.showError('Analysis failed. Please try again.');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        this.showError(error.message || 'An error occurred. Please try again.');
    } finally {
        this.isProcessing = false;
        this.hideProcessingState(form);
    }
};

HygieiaApp.submitDermatologyForm = async function(form) {
    const fileInput = form.querySelector('input[type="file"]');
    if (!fileInput || !fileInput.files[0]) {
        throw new Error('Please select an image file');
    }
    
    return await this.uploadFile(fileInput.files[0], HygieiaAPI.endpoints.dermatology);
};

HygieiaApp.submitHeartDiseaseForm = async function(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return await this.makeAPIRequest(HygieiaAPI.endpoints.heartDisease, {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

HygieiaApp.submitBreastCancerForm = async function(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return await this.makeAPIRequest(HygieiaAPI.endpoints.breastCancer, {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

HygieiaApp.submitDiabetesForm = async function(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return await this.makeAPIRequest(HygieiaAPI.endpoints.diabetes, {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

// ==================== RESULTS DISPLAY ====================

HygieiaApp.showResults = function(result) {
    // Create results modal or redirect to results page
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title"><i class="fas fa-check-circle me-2"></i>Analysis Complete</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-success">
                        <strong>Analysis completed successfully!</strong>
                    </div>
                    ${this.formatResultPreview(result)}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="HygieiaApp.viewFullResults('${result.result_id}')">
                        View Full Results
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
};

HygieiaApp.formatResultPreview = function(result) {
    if (result.prediction) {
        const prediction = result.prediction;
        let html = '<div class="result-preview">';
        
        if (prediction.condition_name) {
            html += `<p><strong>Condition:</strong> ${prediction.condition_name}</p>`;
        }
        
        if (prediction.confidence) {
            html += `<p><strong>Confidence:</strong> ${(prediction.confidence * 100).toFixed(1)}%</p>`;
        }
        
        if (prediction.risk_level) {
            html += `<p><strong>Risk Level:</strong> ${prediction.risk_level}</p>`;
        }
        
        html += '</div>';
        return html;
    }
    
    return '<p>Analysis results are ready for detailed review.</p>';
};

HygieiaApp.viewFullResults = function(resultId) {
    // Create a simple results page or redirect
    window.open(`results.html?id=${resultId}`, '_blank');
};

// ==================== ERROR HANDLING ====================

HygieiaApp.showError = function(message) {
    this.showMessage(message, 'danger');
};

HygieiaApp.showSuccess = function(message) {
    this.showMessage(message, 'success');
};

HygieiaApp.showWarning = function(message) {
    this.showMessage(message, 'warning');
};

HygieiaApp.showMessage = function(message, type = 'info') {
    const container = document.getElementById('flash-messages');
    if (!container) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    container.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
};

// ==================== PROCESSING STATE ====================

HygieiaApp.showProcessingState = function(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    }
    
    // Show loading overlay
    this.showLoadingOverlay('Processing your request...');
};

HygieiaApp.hideProcessingState = function(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        // Restore original text based on module
        const originalTexts = {
            'dermatology': '<i class="fas fa-search me-1"></i> Analyze Image',
            'heart_disease': '<i class="fas fa-heartbeat me-1"></i> Assess Risk',
            'breast_cancer': '<i class="fas fa-ribbon me-1"></i> Analyze Risk',
            'diabetes': '<i class="fas fa-tint me-1"></i> Check Risk'
        };
        submitButton.innerHTML = originalTexts[this.currentModule] || 'Submit';
    }
    
    this.hideLoadingOverlay();
};

HygieiaApp.showLoadingOverlay = function(message = 'Loading...') {
    let overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        const messageElement = overlay.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
};

HygieiaApp.hideLoadingOverlay = function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
};

// ==================== UTILITY FUNCTIONS ====================

// Copy existing utility functions from main.js
HygieiaApp.initializeTooltips = function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

HygieiaApp.setupFormValidation = function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formId = form.id || 'unknown';
        this.formValidation[formId] = {
            isValid: false,
            errors: [],
            requiredFields: form.querySelectorAll('[required]')
        };
        
        // Real-time validation
        form.addEventListener('input', this.validateFormField.bind(this));
        form.addEventListener('blur', this.validateFormField.bind(this), true);
    });
};

HygieiaApp.setupImageHandling = function() {
    // Drag and drop for image uploads
    const dropZones = document.querySelectorAll('.image-upload-area, [type="file"]');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', this.handleDragOver.bind(this));
        zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        zone.addEventListener('drop', this.handleFileDrop.bind(this));
    });
};

HygieiaApp.setupAccessibility = function() {
    // Skip to main content link
    this.createSkipLink();
    
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.diagnostic-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', this.handleCardKeydown.bind(this));
    });
    
    // Screen reader announcements for dynamic content
    this.createAriaLiveRegion();
};

HygieiaApp.handleFileSelection = function(event) {
    const input = event.target;
    if (input.type !== 'file') return;
    
    const files = Array.from(input.files);
    files.forEach(file => {
        this.validateMedicalImage(file, input);
    });
};

HygieiaApp.validateForm = function(form) {
    // Basic validation - can be enhanced
    const requiredFields = form.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value || field.value.trim() === '') {
            return false;
        }
    }
    return true;
};

HygieiaApp.validateFormField = function(event) {
    // Basic field validation
    const field = event.target;
    field.classList.remove('is-invalid', 'is-valid');
    
    if (field.hasAttribute('required') && (!field.value || field.value.trim() === '')) {
        field.classList.add('is-invalid');
        return false;
    } else {
        field.classList.add('is-valid');
        return true;
    }
};

HygieiaApp.showValidationErrors = function(form) {
    const invalidFields = form.querySelectorAll('.is-invalid');
    if (invalidFields.length > 0) {
        this.showError('Please fill in all required fields');
        invalidFields[0].focus();
    }
};

HygieiaApp.validateMedicalImage = function(file, inputElement) {
    const validation = {
        valid: true,
        errors: [],
        warnings: []
    };
    
    // File size validation (16MB limit)
    if (file.size > 16 * 1024 * 1024) {
        validation.valid = false;
        validation.errors.push('File size exceeds 16MB limit');
    }
    
    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        validation.valid = false;
        validation.errors.push('Invalid file type. Please upload JPG, PNG, or GIF files only');
    }
    
    if (!validation.valid) {
        this.showError(validation.errors.join('. '));
        inputElement.value = '';
    }
    
    return validation.valid;
};

// Additional utility functions can be copied from main.js as needed
HygieiaApp.handleNavigation = function(event) {
    // Basic navigation handling
};

HygieiaApp.handleDragOver = function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('dragover');
};

HygieiaApp.handleDragLeave = function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('dragover');
};

HygieiaApp.handleFileDrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    const fileInput = document.querySelector('input[type="file"]');
    
    if (fileInput && files.length > 0) {
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
        
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
};

HygieiaApp.handleCardKeydown = function(event) {
    const card = event.currentTarget;
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const link = card.querySelector('a');
        if (link) link.click();
    }
};

HygieiaApp.createSkipLink = function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable btn btn-primary position-absolute';
    skipLink.style.zIndex = '9999';
    skipLink.style.top = '10px';
    skipLink.style.left = '10px';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
};

HygieiaApp.createAriaLiveRegion = function() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    
    document.body.appendChild(liveRegion);
};

HygieiaApp.handleBeforeUnload = function(event) {
    if (this.isProcessing) {
        event.preventDefault();
        event.returnValue = '';
        return '';
    }
};

HygieiaApp.handleResize = function() {
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile-view', isMobile);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    HygieiaApp.init();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HygieiaApp;
}