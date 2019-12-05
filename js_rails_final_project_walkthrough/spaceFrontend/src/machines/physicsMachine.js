class PhysicsMachine{

    //f = G (m1*m2)/(r ** 2)

    static get G(){
        return 0.000000000067
    }

    static get pixelsToMeters(){
        return 1 / Mass.sizeRatio
    }

    static get metersToPixels(){
        return 1 / this.pixelsToMeters
    }

    static getDistance(mass1, mass2){
        return {
            x: mass2.location.x - mass1.location.x,
            y: mass2.location.y - mass1.location.y
        }
    }

    static allForcesForMass(mass, massArr){
        let totalForce = {x: 0, y: 0}
        for(let m of massArr){
            if( m !== mass ){
                const force = this.forcesOnMass(mass, m)
                totalForce = this.addForces(totalForce, force)
            }
        }
        // console.log(totalForce)
        return totalForce
    }

    static forcesOnMass(mass1, mass2){
        const distance = this.getDistance(mass1, mass2)
        const forcexy = this.G * (mass1.mass * mass2.mass) 
        const polarDistance = this.cartToPolar(distance)
        const force = forcexy / ((polarDistance.magnitude * this.pixelsToMeters )** 2)
        if(isNaN(force)){ alert('Collision!'); return }
        // console.log(polarDistance.angle)
        // const forcex = this.sign(distance.x) * forcexy / ((distance.x * this.pixelsToMeters) ** 2)
        // const forcey = this.sign(distance.y) * forcexy / ((distance.y * this.pixelsToMeters) ** 2)
        const forceVector = this.polarToCart(force, polarDistance.angle)
        // console.log('dist in meters', polarDistance.magnitude * this.pixelsToMeters)
        return forceVector
        
    }

    static addForces(force1, force2){
        return {
            x: force1.x + force2.x,
            y: force1.y + force2.y
        }
    }

    static sign(num){
        if(num < 0){
            return -1
        }else if(num > 0){
            return 1
        }else{
            return 0
        }
    }

    static polarToCart(mag, ang){
        // console.log('mag, angle, x, y', mag, ang, mag * Math.cos(ang), mag * Math.sin(ang))
        return {
            x: mag * Math.cos(ang),
            y: mag * Math.sin(ang)
        }
    }

    static cartToPolar(vec){
        return {
            magnitude: this.vecMag(vec),
            angle: this.vecAng(vec)
        }
    }



    static vecMag(vec){
        return Math.sqrt(vec.x ** 2 + vec.y ** 2)
    }

    static vecAng(vec){
        // console.log('x, y', vec.x, vec.y)

        let atan = Math.atan(vec.y / vec.x)
        // console.log('atan', atan)
        
        if(vec.y < 0){
            if(vec.x < 0){
                atan = atan + (Math.PI )
            }
        }else{
            if(vec.x < 0){
                atan = atan + (Math.PI)
            }
        }
        return atan
    }

    static updateMass(mass, force, time){
        const deltaLocation = this.locationChange(mass.velocity, time)
        mass.location = this.addForces(mass.location, deltaLocation)
        const acceleration = this.currentAcceleration(mass, force)
        // console.log(mass.name, acceleration)
        const deltaVelocity = this.velocityChange(acceleration, time)
        mass.velocity = this.addForces(mass.velocity, deltaVelocity)
    }

    static currentAcceleration(mass, force){
        return {
            x: force.x / mass.mass,
            y: force.y / mass.mass
        }
    }

    static velocityChange(accel, time){
        return {
            x: this.integrate(accel.x, time),
            y: this.integrate(accel.y, time)
        }
    }   

    static locationChange(velocity, time){
        return {
            x: this.integrate(velocity.x, time) * this.metersToPixels,
            y: this.integrate(velocity.y, time) * this.metersToPixels
        }
    }

    static integrate(num, time){
        return num * time 
    }

}


