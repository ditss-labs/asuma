import { createCanvas, loadImage } from "canvas";

export async function levelUp(options) {
  const { backgroundURL, avatarURL, fromLevel, toLevel, name } = options;

  const width = 600;
  const height = 150;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);

  const background = await loadImage(backgroundURL);
  ctx.drawImage(background, 0, 0, width, height);

  const overlayX = 10;
  const overlayY = 10;
  const overlayWidth = width - 20;
  const overlayHeight = height - 20;
  const overlayRadius = 40;

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 51, 0.6)';
  ctx.beginPath();
  ctx.moveTo(overlayX + overlayRadius, overlayY);
  ctx.arcTo(overlayX + overlayWidth, overlayY, overlayX + overlayWidth, overlayY + overlayHeight, overlayRadius);
  ctx.arcTo(overlayX + overlayWidth, overlayY + overlayHeight, overlayX, overlayY + overlayHeight, overlayRadius);
  ctx.arcTo(overlayX, overlayY + overlayHeight, overlayX, overlayY, overlayRadius);
  ctx.arcTo(overlayX, overlayY, overlayX + overlayWidth, overlayY, overlayRadius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const avatar = await loadImage(avatarURL);
  const avatarSize = 100;
  const avatarX = overlayX + overlayRadius + 10;

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, height / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, height / 2 - avatarSize / 2, avatarSize, avatarSize);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, height / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = '#3399FF';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText(name, avatarX + avatarSize + 20, height / 2 + 10);

  const circleSize = 55;
  const circleX1 = width - circleSize * 4 + 10;
  const circleX2 = width - circleSize * 2 - 8;
  const arrowX = circleX1 + circleSize + 10;

  // From Level
  ctx.beginPath();
  ctx.arc(circleX1 + circleSize / 2, height / 2, circleSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(51, 153, 255, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#3399FF';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(fromLevel, circleX1 + circleSize / 2, height / 2 + 8);

  // Arrow
  ctx.beginPath();
  ctx.moveTo(arrowX, height / 2 - 8);
  ctx.lineTo(arrowX + 20, height / 2);
  ctx.lineTo(arrowX, height / 2 + 8);
  ctx.closePath();
  ctx.fillStyle = '#3399FF';
  ctx.fill();

  // To Level
  ctx.beginPath();
  ctx.arc(circleX2 + circleSize / 2, height / 2, circleSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(51, 153, 255, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#3399FF';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(toLevel, circleX2 + circleSize / 2, height / 2 + 8);

  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.moveTo(overlayX + overlayRadius, overlayY);
  ctx.arcTo(overlayX + overlayWidth, overlayY, overlayX + overlayWidth, overlayY + overlayHeight, overlayRadius);
  ctx.arcTo(overlayX + overlayWidth, overlayY + overlayHeight, overlayX, overlayY + overlayHeight, overlayRadius);
  ctx.arcTo(overlayX, overlayY + overlayHeight, overlayX, overlayY, overlayRadius);
  ctx.arcTo(overlayX, overlayY, overlayX + overlayWidth, overlayY, overlayRadius);
  ctx.closePath();
  ctx.fill();

  return canvas.toBuffer();
}
