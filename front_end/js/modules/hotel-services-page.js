let selectedStatus = "active";
let editServiceId = null;
let uploadedImages = [];
let selectedThumbnail = null;
let selectedServiceId = null;

/* =========================
RENDER SERVICES
========================= */
export function renderServicesPage() {
    const container = document.getElementById("service-grid");
    if (!container) return;

    const services = JSON.parse(localStorage.getItem("hotelServices")) || [];

    if (services.length === 0) {
        container.innerHTML = `
            <div class="hotel-empty">
                <p>No services added yet</p>
                <button class="btn-blue" onclick="openServiceModal()">+ Add Service</button>
            </div>
        `;
        return;
    }

    container.innerHTML = services.map(service => {

        const statusClass = service.status === "active" ? "active" : "inactive";
        const statusText = service.status === "active" ? "Active" : "Inactive";

        const imageSrc = service.thumbnail
            ? service.thumbnail
            : "../components/ui/dashboard.png";

        return `
        <div class="hotel-service-card">

            <div class="hotel-service-header">
                <img src="${imageSrc}" class="hotel-service-img"/>

                <div>
                    <h3>${service.name}</h3>
                    <span class="hotel-status ${statusClass}">
                        ${statusText}
                    </span>
                </div>
            </div>

            <div class="hotel-service-info">

                <div>
                    <p class="hotel-sub-text">Price per Night</p>
                    <h4>$${service.price}</h4>
                </div>

                <div>
                    <p class="hotel-sub-text">Capacity</p>
                    <h4>${service.capacity} guests</h4>
                </div>

                <div>
                    <p class="hotel-sub-text">Rooms Available</p>
                    <h4>${service.availableRooms} / ${service.totalRooms}</h4>
                </div>

            </div>

            <div class="hotel-service-actions">
                <button class="btn-light" onclick="editService(${service.id})">Edit</button>
                <button class="btn-blue" onclick="openAvailabilityModal(${service.id})">Manage Availability</button>
            </div>

        </div>
        `;
    }).join("");
}

/* =========================
MODAL OPEN / CLOSE
========================= */
window.openServiceModal = function () {
    const modal = document.getElementById("add-service-modal");
    if (modal) modal.classList.remove("hidden");
};

window.closeServiceModal = function () {
    const modal = document.getElementById("add-service-modal");

    if (modal) modal.classList.add("hidden");

    editServiceId = null;

    // RESET INPUTS
    document.getElementById("serviceName").value = "";
    document.getElementById("servicePrice").value = "";
    document.getElementById("serviceCapacity").value = "";
    document.getElementById("serviceTotal").value = "";

    // RESET IMAGES
    uploadedImages = [];
    selectedThumbnail = null;

    renderImagePreview();

    // RESET TITLE
    const modalTitle = document.querySelector(".hotel-modal-header h2");
    if (modalTitle) modalTitle.innerText = "Add Service";
};

/* =========================
STATUS TOGGLE
========================= */
window.setStatus = function(status) {
    selectedStatus = status;

    const activeBtn = document.getElementById("statusActive");
    const inactiveBtn = document.getElementById("statusInactive");

    if (!activeBtn || !inactiveBtn) return;

    activeBtn.classList.remove("active");
    inactiveBtn.classList.remove("active");

    if (status === "active") {
        activeBtn.classList.add("active");
    } else {
        inactiveBtn.classList.add("active");
    }
};

/* =========================
SAVE SERVICE
========================= */
window.saveService = function () {

    const name = document.getElementById("serviceName")?.value;
    const price = document.getElementById("servicePrice")?.value;
    const capacity = document.getElementById("serviceCapacity")?.value;
    const total = document.getElementById("serviceTotal")?.value;

    if (!name || !price || !capacity || !total) {
        alert("Fill all fields");
        return;
    }

    let services = JSON.parse(localStorage.getItem("hotelServices")) || [];

    if (editServiceId) {

        // UPDATE EXISTING
        services = services.map(s =>
            s.id === editServiceId
                ? {
                    ...s,
                    name,
                    price: Number(price),
                    capacity: Number(capacity),
                    totalRooms: Number(total),
                    status: selectedStatus,
                    images: uploadedImages.length ? uploadedImages : s.images,
                    thumbnail: selectedThumbnail || s.thumbnail
                }
                : s
        );

        editServiceId = null;

    } else {

        // CREATE NEW
        const newService = {
            id: Date.now(),
            name,
            price: Number(price),
            capacity: Number(capacity),
            totalRooms: Number(total),
            availableRooms: Number(total),
            status: selectedStatus,
            images: uploadedImages,
            thumbnail: selectedThumbnail
        };

        services.push(newService);
    }

    localStorage.setItem("hotelServices", JSON.stringify(services));

    closeServiceModal();
    renderServicesPage();
};
/* =========================
EDIT (PLACEHOLDER FOR NEXT)
========================= */
window.editService = function(id) {

    const services = JSON.parse(localStorage.getItem("hotelServices")) || [];
    const service = services.find(s => s.id === id);

    if (!service) return;

    editServiceId = id;

    // PREFILL FIELDS
    document.getElementById("serviceName").value = service.name;
    document.getElementById("servicePrice").value = service.price;
    document.getElementById("serviceCapacity").value = service.capacity;
    document.getElementById("serviceTotal").value = service.totalRooms;

    // STATUS
    selectedStatus = service.status;
    setStatus(service.status);

    // IMAGES
    uploadedImages = service.images || [];
    selectedThumbnail = service.thumbnail || null;

    renderImagePreview();

    // CHANGE TITLE
    const modalTitle = document.querySelector(".hotel-modal-header h2");
    if (modalTitle) {
        modalTitle.innerText = `Edit Service – ${service.name}`;
    }

    openServiceModal();
};

/* OPEN FILE SELECTOR */
window.triggerImageUpload = function () {
    document.getElementById("imageInput").click();
};

/* HANDLE MULTIPLE IMAGES */
const imageInput = document.getElementById("imageInput");

if (imageInput) {
    imageInput.addEventListener("change", function (e) {

        const files = Array.from(e.target.files);

        if (uploadedImages.length + files.length > 4) {
            alert("Max 4 images allowed");
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = function (event) {
                uploadedImages.push(event.target.result);

                // set first image as thumbnail automatically
                if (!selectedThumbnail) {
                    selectedThumbnail = event.target.result;
                }

                renderImagePreview();
            };

            reader.readAsDataURL(file);
        });
    });
}

function renderImagePreview() {
    const preview = document.getElementById("imagePreview");
    if (!preview) return;

    preview.innerHTML = uploadedImages.map((img, index) => `
        <div class="img-box">

            <img 
                src="${img}" 
                class="${img === selectedThumbnail ? 'active' : ''}"
                onclick="setThumbnail(${index})"
            />

            <span class="delete-img" onclick="deleteImage(${index})">✕</span>

        </div>
    `).join("");
}

window.deleteImage = function(index) {

    const removedImage = uploadedImages[index];

    // remove image
    uploadedImages.splice(index, 1);

    // if deleted image was thumbnail → update
    if (removedImage === selectedThumbnail) {
        selectedThumbnail = uploadedImages.length > 0 ? uploadedImages[0] : null;
    }

    renderImagePreview();
};

/* SELECT DP IMAGE */
window.setThumbnail = function(index) {
    selectedThumbnail = uploadedImages[index];
    renderImagePreview();
};

window.openAvailabilityModal = function(id) {

    const services = JSON.parse(localStorage.getItem("hotelServices")) || [];
    const service = services.find(s => s.id === id);

    if (!service) return;

    selectedServiceId = id;

    document.getElementById("availabilityTitle").innerText =
        `Manage Availability – ${service.name}`;

    document.getElementById("totalRoomsInput").value = service.totalRooms;
    document.getElementById("availableRoomsInput").value = service.availableRooms;

    const occupied = service.totalRooms - service.availableRooms;
    document.getElementById("occupiedRoomsInput").value = occupied;

    // ✅ 👉 ADD YOUR CODE HERE
    const input = document.getElementById("availableRoomsInput");

    input.oninput = function () {
        const total = Number(document.getElementById("totalRoomsInput").value);
        const available = Number(this.value);

        const occupied = total - available;

        document.getElementById("occupiedRoomsInput").value =
            occupied >= 0 ? occupied : 0;
    };

    // OPEN MODAL
    document.getElementById("availability-modal").classList.remove("hidden");
};

window.saveAvailability = function() {

    let services = JSON.parse(localStorage.getItem("hotelServices")) || [];

    const available = Number(document.getElementById("availableRoomsInput").value);

    services = services.map(s =>
        s.id === selectedServiceId
            ? { ...s, availableRooms: available }
            : s
    );

    localStorage.setItem("hotelServices", JSON.stringify(services));

    closeAvailabilityModal();
    renderServicesPage();
};

window.closeAvailabilityModal = function () {
    document.getElementById("availability-modal").classList.add("hidden");
};