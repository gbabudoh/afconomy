import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a high-fidelity PDF intelligence report.
 */
export async function generatePDFReport(data: {
  country: string;
  sector: string;
  metrics: any[];
  tableData: any[];
  chartRef: React.RefObject<HTMLDivElement>;
}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // 1. Header & Branding
  doc.setFillColor(255, 2, 1); // Primary Red
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("AFCONOMY INTELLIGENCE", margin, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("CONFIDENTIAL INSTITUTIONAL REPORT", margin, 32);
  doc.text(new Date().toLocaleDateString(), pageWidth - margin - 30, 32);

  // 2. Report Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.country} - ${data.sector} Analysis`, margin, 55);
  
  doc.setDrawColor(0, 0, 0, 0.1);
  doc.line(margin, 60, pageWidth - margin, 60);

  // 3. Key Metrics Summary
  doc.setFontSize(12);
  doc.text("Executive Summary", margin, 70);
  
  let yPos = 80;
  data.metrics.forEach((m, i) => {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(m.label.toUpperCase(), margin, yPos);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(m.value, margin + 60, yPos);
    
    doc.setFontSize(10);
    if (m.isUp) doc.setTextColor(16, 185, 129);
    else doc.setTextColor(239, 68, 68);
    doc.text(m.change, margin + 100, yPos);
    
    yPos += 12;
  });

  // 4. Chart Capture (if available)
  if (data.chartRef.current) {
    try {
      const canvas = await html2canvas(data.chartRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      doc.addPage();
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Performance Analytics", margin, 20);
      doc.addImage(imgData, "PNG", margin, 30, imgWidth, imgHeight);
    } catch (e) {
      console.error("Chart capture failed:", e);
    }
  }

  // 5. Detailed Indicators Table
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Detailed Indicator Table", margin, 20);
  
  let tableY = 30;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("INDICATOR", margin, tableY);
  doc.text("CURRENT VALUE", margin + 80, tableY);
  doc.text("FORECAST", margin + 130, tableY);
  
  doc.line(margin, tableY + 2, pageWidth - margin, tableY + 2);
  tableY += 10;

  data.tableData.forEach((row, i) => {
    if (tableY > 270) {
      doc.addPage();
      tableY = 20;
    }
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(row.name, margin, tableY);
    
    doc.setFontSize(10);
    doc.text(row.value, margin + 80, tableY);
    
    doc.setFontSize(10);
    doc.text(`${row.projection}%`, margin + 130, tableY);
    
    tableY += 10;
  });

  // Footer on all pages
  const totalPages = (doc as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Afconomy Intelligence Unit - Confidential - Page ${i} of ${totalPages}`, pageWidth / 2, 285, { align: "center" });
  }

  doc.save(`${data.country}_${data.sector}_Report.pdf`);
}
