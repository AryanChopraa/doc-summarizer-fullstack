import jsPDF from 'jspdf'

export const downloadSummaryPDF = (summary) => {
  if (!summary) return
  const doc = new jsPDF()

  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPosition = margin

  const addNewPageIfNeeded = (height) => {
    if (yPosition + height > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  const writeText = (text, fontSize, isBold = false) => {
    doc.setFontSize(fontSize)
    doc.setFont(undefined, isBold ? 'bold' : 'normal')
    const splitText = doc.splitTextToSize(text, pageWidth - 2 * margin)
    addNewPageIfNeeded(splitText.length * fontSize * 0.3527)
    doc.text(splitText, margin, yPosition)
    yPosition += splitText.length * fontSize * 0.3527 + 5
  }

  const writeList = (items, fontSize) => {
    items.forEach(item => {
      const bulletPoint = `• ${item}`
      writeText(bulletPoint, fontSize)
    })
    yPosition += 5
  }

  writeText(summary.mainTopic || 'Untitled Summary', 20, true)

  writeText(`Sentiment: ${summary.sentiment}`, 12)
  yPosition += 5

  writeText('Subtopics', 16, true)
  writeList(summary.subtopics, 12)

  writeText('Key Insights', 16, true)
  writeList(summary.keyInsights, 12)

  writeText('Keywords', 16, true)
  writeList(summary.keywords, 12)

  writeText('Summary', 16, true)
  writeText(summary.summary, 12)

  yPosition = pageHeight - 30
  writeText(`Created: ${new Date(summary.createdAt).toLocaleString()}`, 10)
  writeText('Generated by Summarize.AI', 10)

  doc.save(`${summary.mainTopic || 'Summary'}.pdf`)
}