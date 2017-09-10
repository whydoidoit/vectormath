import {V, Q} from 'working'

let result = {
    x: 0,
    point: null
}

function lineToPlane(lineStart, lineDirection, planeNormal, planePoint) {
    let d = planeNormal.dot(planePoint)
    if(planeNormal.dot(lineDirection)===0) {
        lineDirection.x-=0.001
    }
    let x = (d - planeNormal.dot(lineStart)) / planeNormal.dot(lineDirection)

    result.x = x
    result.point = V(lineStart).add(V(lineDirection).scale(x))
    return result
}

function distancePointToLine(lineStart, lineDirection, pt) {
    let pa = V(lineStart).sub(pt)
    let c = V(lineDirection).scale(pa.dot(lineDirection) / lineDirection.dot(lineDirection))
    let d = pa.sub(c)
    return Math.sqrt(d.dot(d))
}

function clampToPlaneArea(lineStart, lineDirection, planeNormal, planePoint, width, height) {
    let dot = lineDirection.dot(planeNormal)
    let normalise = Q().fromToRotation(planeNormal, pc.Vec3.UP)
    let denormalise = Q().fromToRotation(pc.Vec3.UP, planeNormal)
    let intersection = lineToPlane(lineStart, lineDirection, planeNormal, planePoint)
    let redot = V(intersection.point).sub(lineStart).normalize().dot(lineDirection)
    let normalisedPoint = normalise.transformVector(V(intersection.point).sub(planePoint), V())

    if(redot < 0) {
        normalisedPoint.scale(-1)
    }
    let moved = 0
    let amount = 0
    if (normalisedPoint.x < -width) {
        amount = Math.abs(normalisedPoint.x) - width
        moved += amount * amount
        normalisedPoint.x = -width
    }
    if (normalisedPoint.x > width) {
        amount = Math.abs(normalisedPoint.x) - width
        moved += amount * amount
        normalisedPoint.x = width 
    }
    if (normalisedPoint.z > height) {
        amount = Math.abs(normalisedPoint.z) - height
        moved += amount * amount
        normalisedPoint.z = height
    }
    if (normalisedPoint.z < -height) {
        amount = Math.abs(normalisedPoint.z) - height
        moved += amount * amount
        normalisedPoint.z = -height
    }
    let clampedPoint = denormalise.transformVector(normalisedPoint, V()).add(planePoint)
    let newDirection = V(clampedPoint).sub(lineStart).normalize()
    newDirection.moved = moved | redot < 0
    return newDirection
}

export {lineToPlane, clampToPlaneArea}
