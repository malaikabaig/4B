import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

function signToken(id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: 'Email and password are required' });
    return;
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  res.json({
    success: true,
    token: signToken(admin._id.toString()),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
}

export async function getMe(
  req: Request & { adminId?: string },
  res: Response,
): Promise<void> {
  const admin = await Admin.findById(req.adminId).select('-password');
  if (!admin) {
    res.status(404).json({ success: false, message: 'Admin not found' });
    return;
  }
  res.json({ success: true, admin });
}
