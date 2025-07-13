# Firebase ke liye
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# React Native ke liye
-keep class com.facebook.react.** { *; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactProp *; }

# Reanimated ke liye
-keep class com.swmansion.reanimated.** { *; }

# Vision Camera ya ML Kit agar use ho raha:
-keep class com.rnmlkit.** { *; }
-keep class com.mrousavy.camera.** { *; }

# General reflection
-keepattributes *Annotation*
-keep class * extends java.lang.annotation.Annotation { *; }
