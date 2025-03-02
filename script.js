// Initialize complaints array from local storage or create empty array
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

// Form submission handler
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const complaint = document.getElementById('complaint').value;
    
    // Create complaint object
    const newComplaint = {
        id: Date.now(),
        name,
        email,
        department,
        complaint,
        status: 'Pending',
        date: new Date().toLocaleString()
    };
    
    // Add to complaints array
    complaints.push(newComplaint);
    
    // Save to local storage
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    // Show success message
    alert('Complaint submitted successfully! Your complaint ID is: ' + newComplaint.id);
    
    // Reset form
    this.reset();
});

// Status tracking handler
document.getElementById('trackButton').addEventListener('click', function() {
    const trackingId = document.getElementById('trackingId').value;
    const statusResult = document.getElementById('statusResult');
    
    if (!trackingId) {
        statusResult.innerHTML = '<p class="error">Please enter a complaint ID</p>';
        return;
    }
    
    // Find the complaint
    const complaint = complaints.find(c => c.id == trackingId);
    
    if (complaint) {
        statusResult.innerHTML = `
            <div class="status-card">
                <h3>Complaint Status</h3>
                <p><strong>ID:</strong> ${complaint.id}</p>
                <p><strong>Name:</strong> ${complaint.name}</p>
                <p><strong>Department:</strong> ${complaint.department}</p>
                <p><strong>Status:</strong> <span class="status ${complaint.status.toLowerCase()}">${complaint.status}</span></p>
                <p><strong>Date Submitted:</strong> ${complaint.date}</p>
            </div>
        `;
    } else {
        statusResult.innerHTML = '<p class="error">No complaint found with that ID</p>';
    }
});

// Utility function to update status (for admin use)
function updateComplaintStatus(complaintId, newStatus) {
    const complaint = complaints.find(c => c.id == complaintId);
    if (complaint) {
        complaint.status = newStatus;
        localStorage.setItem('complaints', JSON.stringify(complaints));
        return true;
    }
    return false;
}

// Office names mapping
const officeNames = {
    'ed': 'ED Office',
    'dsw': 'DSW Office',
    'ecell': 'E-Cell',
    'dcpd': 'DCPD Office',
    'admin': 'Admin Office'
};

// Handle office selection
function handleOfficeSelection() {
    const urlParams = new URLSearchParams(window.location.search);
    const office = urlParams.get('office');
    
    if (office && officeNames[office]) {
        const uploadTitle = document.getElementById('upload-title');
        const officeInput = document.getElementById('selectedOffice');
        
        if (uploadTitle) {
            uploadTitle.textContent = `Upload Application to ${officeNames[office]}`;
        }
        if (officeInput) {
            officeInput.value = office;
        }
    }
}

// File upload handler
document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('applicationFile');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size must be less than 5MB');
            return;
        }
        
        // Here you would typically send the file to a server
        // For now, we'll just show a success message
        alert('Application uploaded successfully!');
        fileInput.value = ''; // Clear the input
    } else {
        alert('Please select a file to upload');
    }
});