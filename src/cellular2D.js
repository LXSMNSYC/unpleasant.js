/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import {
  floor, min, max, sqrt, MOD_7_CONST, mod289, permute289 as permute, mod7,
} from './utils';
/**
 * @ignore
 */
const K = MOD_7_CONST;
/**
 * @ignore
 */
const KO = 0.42857142857;
/**
 * @ignore
 */
const JITTER = 1.0;
/**
 * @memberof Unpleasant
 * @description
 * The basic idea is to take random points in space (2- or 3-dimensional)
 * and then for every point in space take the distance to the nth-closest
 * point (e.g. the second-closest point) as some kind of color information.
 * More precisely:
 *
 *  Randomly distribute feature points in space
 *  Noise Fn(x) is distance to nth-closest point to x
 *
 * Typical implementations, in three dimensions, divide the space into cubes.
 * A fixed number of positions are generated for each cube.
 * In the case of three dimensions, nine cubes' points need to be generated,
 * to be sure to find the closest.
 *
 * @see https://en.wikipedia.org/wiki/Worley_noise
 * @see https://github.com/ashima/webgl-noise/blob/master/src/cellular2D.glsl
 * @param {!Number} x - x component of a 2D vector
 * @param {!Number} y - y component of a 2D vector
 * @returns {Array} a 2D vector
 */
export default function cellular2D(x, y) {
  const Pix = mod289(floor(x));
  const Piy = mod289(floor(y));

  const Pfx = x % 1;
  const Pfy = y % 1;

  const oix = -1.0;
  const oiy = 0.0;
  const oiz = 1.0;

  const ofx = -0.5;
  const ofy = 0.5;
  const ofz = -1.5;

  const pxx = permute(Pix + oix);
  const pxy = permute(Pix + oiy);
  const pxz = permute(Pix + oiz);

  let px = permute(pxx + Piy + oix);
  let py = permute(pxx + Piy + oiy);
  let pz = permute(pxx + Piy + oiz);

  let Kpx = px * K;
  let Kpy = py * K;
  let Kpz = pz * K;

  let oxx = (Kpx % 1) - KO;
  let oxy = (Kpy % 1) - KO;
  let oxz = (Kpz % 1) - KO;

  let oyx = mod7(floor(Kpx)) * K - KO;
  let oyy = mod7(floor(Kpy)) * K - KO;
  let oyz = mod7(floor(Kpz)) * K - KO;

  let dxx = Pfx + 0.5 + JITTER * oxx;
  let dxy = Pfx + 0.5 + JITTER * oxy;
  let dxz = Pfx + 0.5 + JITTER * oxz;

  let dyx = Pfy - ofx + JITTER * oyx;
  let dyy = Pfy - ofy + JITTER * oyy;
  let dyz = Pfy - ofz + JITTER * oyz;

  let d1x = dxx * dxx + dyx * dyx;
  let d1y = dxy * dxy + dyy * dyy;
  let d1z = dxz * dxz + dyz * dyz;

  px = permute(pxy + Piy + oix);
  py = permute(pxy + Piy + oiy);
  pz = permute(pxy + Piy + oiz);

  Kpx = px * K;
  Kpy = py * K;
  Kpz = pz * K;

  oxx = (Kpx % 1) - KO;
  oxy = (Kpy % 1) - KO;
  oxz = (Kpz % 1) - KO;

  oyx = mod7(floor(Kpx)) * K - KO;
  oyy = mod7(floor(Kpy)) * K - KO;
  oyz = mod7(floor(Kpz)) * K - KO;

  dxx = Pfx + 0.5 + JITTER * oxx;
  dxy = Pfx + 0.5 + JITTER * oxy;
  dxz = Pfx + 0.5 + JITTER * oxz;

  dyx = Pfy - ofx + JITTER * oyx;
  dyy = Pfy - ofy + JITTER * oyy;
  dyz = Pfy - ofz + JITTER * oyz;

  let d2x = dxx * dxx + dyx * dyx;
  let d2y = dxy * dxy + dyy * dyy;
  let d2z = dxz * dxz + dyz * dyz;

  px = permute(pxz + Piy + oix);
  py = permute(pxz + Piy + oiy);
  pz = permute(pxz + Piy + oiz);

  Kpx = px * K;
  Kpy = py * K;
  Kpz = pz * K;

  oxx = (Kpx % 1) - KO;
  oxy = (Kpy % 1) - KO;
  oxz = (Kpz % 1) - KO;

  oyx = mod7(floor(Kpx)) * K - KO;
  oyy = mod7(floor(Kpy)) * K - KO;
  oyz = mod7(floor(Kpz)) * K - KO;

  dxx = Pfx + 0.5 + JITTER * oxx;
  dxy = Pfx + 0.5 + JITTER * oxy;
  dxz = Pfx + 0.5 + JITTER * oxz;

  dyx = Pfy - ofx + JITTER * oyx;
  dyy = Pfy - ofy + JITTER * oyy;
  dyz = Pfy - ofz + JITTER * oyz;

  const d3x = dxx * dxx + dyx * dyx;
  const d3y = dxy * dxy + dyy * dyy;
  const d3z = dxz * dxz + dyz * dyz;

  const d1ax = min(d1x, d2x);
  const d1ay = min(d1y, d2y);
  const d1az = min(d1z, d2z);

  d2x = max(d1x, d2x);
  d2y = max(d1y, d2y);
  d2z = max(d1z, d2z);

  d2x = max(d2x, d3x);
  d2y = max(d2y, d3y);
  d2z = max(d2z, d3z);

  d1x = min(d1ax, d2x);
  d1y = min(d1ay, d2y);
  d1z = min(d1az, d2z);


  d2x = max(d1ax, d2x);
  d2y = max(d1ay, d2y);
  d2z = max(d1az, d2z);

  if (d1y < d1x) {
    const tmp = d1x;
    d1x = d1y;
    d1y = tmp;
  }

  if (d1z < d1x) {
    const tmp = d1z;
    d1z = d1x;
    d1x = tmp;
  }

  d1y = min(d1y, d2y);
  d1z = min(d1z, d2z);

  d1y = min(d1y, d1z);
  d1y = min(d1y, d2x);

  return [sqrt(d1x), sqrt(d1y)];
}
