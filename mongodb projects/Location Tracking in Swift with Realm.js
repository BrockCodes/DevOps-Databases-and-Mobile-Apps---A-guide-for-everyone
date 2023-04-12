To use Swift with MongoDB Realm to calculate the locations of objects relative to your location, you can follow these general steps:

Set up a MongoDB Realm app and configure it to work with your Swift app.

Create a data model in Swift that represents the objects you want to track. You can use the @objcMembers attribute to expose the Swift properties to Objective-C.
'''
   import RealmSwift

   @objcMembers
   class Object: Object {
       dynamic var id = UUID().uuidString
       dynamic var name = ""
       dynamic var latitude = 0.0
       dynamic var longitude = 0.0
   }
Create a Realm database and add some sample data.

   let config = Realm.Configuration(schemaVersion: 1)
   Realm.Configuration.defaultConfiguration = config
   let realm = try! Realm()

   try! realm.write {
       let object1 = Object()
       object1.name = "Object 1"
       object1.latitude = 37.7749
       object1.longitude = -122.4194
       realm.add(object1)

       let object2 = Object()
       object2.name = "Object 2"
       object2.latitude = 37.773972
       object2.longitude = -122.431297
       realm.add(object2)
   }
Retrieve the objects from the Realm database and calculate their distances and bearings relative to your location.
   let objects = realm.objects(Object.self)

   let myLocation = CLLocation(latitude: 37.7749, longitude: -122.4194)
   for object in objects {
       let objectLocation = CLLocation(latitude: object.latitude, longitude: object.longitude)
       let distance = myLocation.distance(from: objectLocation)
       let bearing = myLocation.bearing(to: objectLocation)
       print("Object: \(object.name), Distance: \(distance)m, Bearing: \(bearing)°")
   }
'''
In this example, we create a CLLocation object for our location and loop through each object in the Realm database. We create a CLLocation object for each object’s location and use the distance(from:) method to calculate the distance between the two locations. We use the bearing(to:) method to calculate the bearing from our location to the object’s location.

Note that the bearing(to:) method returns the bearing in degrees clockwise from true north, so you may need to convert it to a different format depending on your use case.

Update the UI to display the calculated distances and bearings.

You can update the UI of your app to display the calculated distances and bearings. You may also want to add functionality to dynamically update the locations of the objects in the database, as well as your own location, so that the distances and bearings are continually updated in real time.
