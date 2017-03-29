# Campus Heat Map

The This is a campus app showing a dynamic, real-time heat map where student crowds are on a campus environment at any time. Used EddyStone iBeacons and ARM mbed for getting the data.


### Team members:

Ritvik Ritvik

Mohit Singh

Karan Mirani

Sarah Samji

Eddystone Beacon

	-The beacon ID is formatted using iBeacon format, thus having a UUID, Major and Minor ID. (UUID: 11111111-1111-1111-1111-111111111111)

	-Beacon Manager class was used for beacon ranging and monitoring.

	-The capacity counter increments with the push of SW2 or SW3 button on the Mbed board. The threshold set is 20, after which the LED light’s up.

	-The board sends the updated population to the server and the server communicates to the board upon pressing “send message” button.

	-Insert capacity counters: loc1, loc2, loc3, loc4 and initialize counter to 0(type int 32)

	```
	eg: _id:"loc1"			(string)
	    counter:0			(int32)

	```

-Change IP value to your corresponding IP in the following files:
	
	-MyApplication.java
	
	-config.js
	
	- Mbed, main.cpp (BROKER value)

- Include the following dependencies in build.gradle(Module:app)
```
	    compile 'com.estimote:sdk:0.11.1@aar'
            compile 'com.android.volley:volley:1.0.0'
```

Challenges:

-Configuring MongoDB with MOSCA broker.

-Generating the heat map using javascript

### Limitations:

-mongodb has to be initialized as mentioned above.
