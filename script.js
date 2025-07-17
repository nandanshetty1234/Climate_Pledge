function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("pledgeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value;
  const profile = this.profile.value;
  const commitments = [...this.commit]
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const starDisplay = "* ".repeat(commitments.length).trim();

  document.getElementById("certName").innerText = `Hi ${name},`;
  document.getElementById("starRating").innerText = starDisplay;
  document.getElementById("certificateSection").style.display = "block";

  const table = document.getElementById("pledgeTable");
  const row = table.insertRow();
  const now = new Date().toLocaleDateString();
  row.innerHTML = `
    <td>${table.rows.length + 1}</td>
    <td>${name}</td>
    <td>${now}</td>
    <td>${this.state.value}</td>
    <td>${profile}</td>
    <td>${starDisplay}</td>
  `;

  document.getElementById("pledgeCount").innerText = table.rows.length;
  const prof = profile.toLowerCase();
  if (prof === "student") {
    document.getElementById("studentCount").innerText++;
  } else if (prof === "working professional") {
    document.getElementById("proCount").innerText++;
  } else {
    document.getElementById("otherCount").innerText++;
  }

  this.reset();
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("certName").innerText.replace("Hi ", "").replace(",", "");
  const stars = document.getElementById("starRating").textContent;

  doc.setLineWidth(1.5);
  doc.setDrawColor(34, 139, 87);
  doc.rect(10, 10, 190, 277);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(34, 139, 87);
  doc.text("Climate Action Pledge Certificate", 105, 40, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("This certifies that", 105, 60, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(name, 105, 75, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("is Cool Enough to Care!", 105, 90, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 204, 0); // yellow color
  doc.text(stars, 105, 110, { align: "center" });

  doc.save(`${name}_Climate_Pledge_Certificate.pdf`);
});

